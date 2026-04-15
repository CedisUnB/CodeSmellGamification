#!/usr/bin/env bash

set -euo pipefail

PROJECT_NAME="code-smell-gamification"
REMOTE_APP_ROOT="/opt/${PROJECT_NAME}"
REMOTE_TMP_BASE=".deploy-${PROJECT_NAME}"
KEEP_RELEASES=3

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
DEFAULTS_FILE="${DEPLOY_DEFAULTS_FILE:-${PROJECT_ROOT}/.deploy_production.defaults}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

prompt_required() {
  local prompt_text="$1"
  local target_var="$2"
  local secret="${3:-false}"
  local value=""

  while [[ -z "${value}" ]]; do
    if [[ "${secret}" == "true" ]]; then
      read -rsp "${prompt_text}: " value
      echo
    else
      read -rp "${prompt_text}: " value
    fi
  done

  printf -v "${target_var}" '%s' "${value}"
}

require_value() {
  local var_name="$1"
  local source_label="$2"

  if [[ -z "${!var_name:-}" ]]; then
    echo "Missing required value ${var_name} in ${source_label}." >&2
    exit 1
  fi
}

escape_sed_replacement() {
  printf '%s' "$1" | sed -e 's/[&|]/\\&/g'
}

require_command git
require_command ssh
require_command scp
require_command tar

if [[ -f "${DEFAULTS_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${DEFAULTS_FILE}"
  require_value VPS_USER "${DEFAULTS_FILE}"
  require_value VPS_SUDO_PASSWORD "${DEFAULTS_FILE}"
  require_value VPS_SERVER "${DEFAULTS_FILE}"
else
  prompt_required "VPS user" VPS_USER
  prompt_required "VPS sudo password" VPS_SUDO_PASSWORD true
  prompt_required "VPS server" VPS_SERVER
fi

SSH_TARGET="${VPS_USER}@${VPS_SERVER}"
TIMESTAMP="$(date +%Y%m%d%H%M%S)"
LOCAL_TMP_DIR="$(mktemp -d)"
ARCHIVE_PATH="${LOCAL_TMP_DIR}/${PROJECT_NAME}-${TIMESTAMP}.tar.gz"
NGINX_TEMPLATE_RELATIVE="deploy/nginx/code-smell-gamification.conf.template"
PROJECT_NAME_Q="$(printf '%q' "${PROJECT_NAME}")"
REMOTE_APP_ROOT_Q="$(printf '%q' "${REMOTE_APP_ROOT}")"
REMOTE_TMP_BASE_Q="$(printf '%q' "${REMOTE_TMP_BASE}")"
KEEP_RELEASES_Q="$(printf '%q' "${KEEP_RELEASES}")"
VPS_USER_Q="$(printf '%q' "${VPS_USER}")"
VPS_SUDO_PASSWORD_Q="$(printf '%q' "${VPS_SUDO_PASSWORD}")"
VPS_SERVER_Q="$(printf '%q' "${VPS_SERVER}")"
TIMESTAMP_Q="$(printf '%q' "${TIMESTAMP}")"
NGINX_TEMPLATE_RELATIVE_Q="$(printf '%q' "${NGINX_TEMPLATE_RELATIVE}")"

cleanup() {
  rm -rf "${LOCAL_TMP_DIR}"
}
trap cleanup EXIT

pushd "${PROJECT_ROOT}" >/dev/null

mapfile -d '' DEPLOY_FILES < <(git ls-files -z --cached --others --exclude-standard)
if [[ -f ".env.production" ]]; then
  DEPLOY_FILES+=(".env.production")
fi

tar -czf "${ARCHIVE_PATH}" "${DEPLOY_FILES[@]}"

popd >/dev/null

echo "Uploading deployment bundle to ${SSH_TARGET}..."
ssh "${SSH_TARGET}" "mkdir -p ~/${REMOTE_TMP_BASE}"
scp "${ARCHIVE_PATH}" "${SSH_TARGET}:~/${REMOTE_TMP_BASE}/bundle.tar.gz"

echo "Running remote deployment..."
ssh "${SSH_TARGET}" 'bash -se' <<EOF
set -euo pipefail

PROJECT_NAME=${PROJECT_NAME_Q}
REMOTE_APP_ROOT=${REMOTE_APP_ROOT_Q}
REMOTE_TMP_BASE=${REMOTE_TMP_BASE_Q}
KEEP_RELEASES=${KEEP_RELEASES_Q}
SSH_USER=${VPS_USER_Q}
SUDO_PASSWORD=${VPS_SUDO_PASSWORD_Q}
SERVER_NAME=${VPS_SERVER_Q}
TIMESTAMP=${TIMESTAMP_Q}
NGINX_TEMPLATE_RELATIVE=${NGINX_TEMPLATE_RELATIVE_Q}

run_sudo() {
  printf '%s\n' "\${SUDO_PASSWORD}" | sudo -S -p '' "\$@"
}

escape_sed_replacement() {
  printf '%s' "\$1" | sed -e 's/[&|]/\\&/g'
}

require_remote_command() {
  if ! command -v "\$1" >/dev/null 2>&1; then
    echo "Missing required command on VPS: \$1" >&2
    exit 1
  fi
}

require_remote_command docker
require_remote_command tar
require_remote_command find
require_remote_command awk
require_remote_command sed
require_remote_command nginx
require_remote_command systemctl

if ! run_sudo docker info >/dev/null 2>&1; then
  echo "Docker is not available via sudo on the VPS." >&2
  exit 1
fi

if ! run_sudo docker compose version >/dev/null 2>&1; then
  echo "Docker Compose plugin is not available on the VPS." >&2
  exit 1
fi

REMOTE_TMP_DIR="\$HOME/\${REMOTE_TMP_BASE}"
REMOTE_RELEASE_DIR="\${REMOTE_APP_ROOT}/releases/\${TIMESTAMP}"
REMOTE_SHARED_DIR="\${REMOTE_APP_ROOT}/shared"
REMOTE_CURRENT_LINK="\${REMOTE_APP_ROOT}/current"

rm -rf "\${REMOTE_TMP_DIR}/release"
mkdir -p "\${REMOTE_TMP_DIR}/release"
tar -xzf "\${REMOTE_TMP_DIR}/bundle.tar.gz" -C "\${REMOTE_TMP_DIR}/release"

run_sudo mkdir -p "\${REMOTE_APP_ROOT}/releases" "\${REMOTE_SHARED_DIR}" "\${REMOTE_RELEASE_DIR}"
run_sudo cp -a "\${REMOTE_TMP_DIR}/release/." "\${REMOTE_RELEASE_DIR}/"
run_sudo chown -R "\${SSH_USER}:\${SSH_USER}" "\${REMOTE_RELEASE_DIR}"

if run_sudo test -f "\${REMOTE_RELEASE_DIR}/.env.production"; then
  run_sudo cp "\${REMOTE_RELEASE_DIR}/.env.production" "\${REMOTE_SHARED_DIR}/.env.production"
elif run_sudo test -f "\${REMOTE_SHARED_DIR}/.env.production"; then
  run_sudo cp "\${REMOTE_SHARED_DIR}/.env.production" "\${REMOTE_RELEASE_DIR}/.env.production"
  run_sudo chown "\${SSH_USER}:\${SSH_USER}" "\${REMOTE_RELEASE_DIR}/.env.production"
else
  run_sudo cp "\${REMOTE_RELEASE_DIR}/.env.production.example" "\${REMOTE_SHARED_DIR}/.env.production"
  run_sudo cp "\${REMOTE_RELEASE_DIR}/.env.production.example" "\${REMOTE_RELEASE_DIR}/.env.production"
  run_sudo chown "\${SSH_USER}:\${SSH_USER}" "\${REMOTE_RELEASE_DIR}/.env.production"
  echo "A template env file was created at \${REMOTE_SHARED_DIR}/.env.production. Fill it and rerun the deploy." >&2
  exit 1
fi

run_sudo ln -sfn "\${REMOTE_RELEASE_DIR}" "\${REMOTE_CURRENT_LINK}"

cd "\${REMOTE_CURRENT_LINK}"

run_sudo docker compose --env-file .env.production -f docker-compose.prod.yml run --build --rm migrate
run_sudo docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build --remove-orphans api web
run_sudo docker compose --env-file .env.production -f docker-compose.prod.yml ps

read_env_value() {
  sed -n "s/^\$1=//p" .env.production | tail -n 1
}

WEB_BIND_PORT="\$(read_env_value WEB_BIND_PORT)"
API_BIND_PORT="\$(read_env_value API_BIND_PORT)"
NGINX_SERVER_NAME="\$(read_env_value NGINX_SERVER_NAME)"
NGINX_SSL_CERTIFICATE="\$(read_env_value NGINX_SSL_CERTIFICATE)"
NGINX_SSL_CERTIFICATE_KEY="\$(read_env_value NGINX_SSL_CERTIFICATE_KEY)"
NGINX_CLIENT_MAX_BODY_SIZE="\$(read_env_value NGINX_CLIENT_MAX_BODY_SIZE)"

if [[ -z "\${WEB_BIND_PORT}" ]]; then
  WEB_BIND_PORT=18080
fi

if [[ -z "\${API_BIND_PORT}" ]]; then
  API_BIND_PORT=13000
fi

if [[ -z "\${NGINX_SERVER_NAME}" ]]; then
  NGINX_SERVER_NAME="\${SERVER_NAME}"
fi

if [[ -z "\${NGINX_CLIENT_MAX_BODY_SIZE}" ]]; then
  NGINX_CLIENT_MAX_BODY_SIZE=20M
fi

if [[ -z "\${NGINX_SSL_CERTIFICATE}" ]]; then
  echo "Missing required value NGINX_SSL_CERTIFICATE in .env.production." >&2
  exit 1
fi

if [[ -z "\${NGINX_SSL_CERTIFICATE_KEY}" ]]; then
  echo "Missing required value NGINX_SSL_CERTIFICATE_KEY in .env.production." >&2
  exit 1
fi

NGINX_SERVER_NAME_ESCAPED="\$(escape_sed_replacement "\${NGINX_SERVER_NAME}")"
NGINX_SSL_CERTIFICATE_ESCAPED="\$(escape_sed_replacement "\${NGINX_SSL_CERTIFICATE}")"
NGINX_SSL_CERTIFICATE_KEY_ESCAPED="\$(escape_sed_replacement "\${NGINX_SSL_CERTIFICATE_KEY}")"
NGINX_CLIENT_MAX_BODY_SIZE_ESCAPED="\$(escape_sed_replacement "\${NGINX_CLIENT_MAX_BODY_SIZE}")"
WEB_BIND_PORT_ESCAPED="\$(escape_sed_replacement "\${WEB_BIND_PORT}")"
API_BIND_PORT_ESCAPED="\$(escape_sed_replacement "\${API_BIND_PORT}")"

NGINX_SITE_NAME="\${PROJECT_NAME}.conf"
NGINX_RENDERED_PATH="\${REMOTE_TMP_DIR}/\${NGINX_SITE_NAME}"

sed \
  -e "s|__SERVER_NAME__|\${NGINX_SERVER_NAME_ESCAPED}|g" \
  -e "s|__SSL_CERTIFICATE__|\${NGINX_SSL_CERTIFICATE_ESCAPED}|g" \
  -e "s|__SSL_CERTIFICATE_KEY__|\${NGINX_SSL_CERTIFICATE_KEY_ESCAPED}|g" \
  -e "s|__CLIENT_MAX_BODY_SIZE__|\${NGINX_CLIENT_MAX_BODY_SIZE_ESCAPED}|g" \
  -e "s|__API_BIND_PORT__|\${API_BIND_PORT_ESCAPED}|g" \
  -e "s|__WEB_BIND_PORT__|\${WEB_BIND_PORT_ESCAPED}|g" \
  "\${REMOTE_CURRENT_LINK}/\${NGINX_TEMPLATE_RELATIVE}" > "\${NGINX_RENDERED_PATH}"

run_sudo cp "\${NGINX_RENDERED_PATH}" "/etc/nginx/sites-available/\${NGINX_SITE_NAME}"
run_sudo ln -sfn "/etc/nginx/sites-available/\${NGINX_SITE_NAME}" "/etc/nginx/sites-enabled/\${NGINX_SITE_NAME}"
run_sudo nginx -t
run_sudo systemctl reload nginx

mapfile -t RELEASE_DIRS < <(run_sudo find "\${REMOTE_APP_ROOT}/releases" -mindepth 1 -maxdepth 1 -type d | sort)
if (( \${#RELEASE_DIRS[@]} > KEEP_RELEASES )); then
  for release_dir in "\${RELEASE_DIRS[@]:0:\${#RELEASE_DIRS[@]}-KEEP_RELEASES}"; do
    run_sudo rm -rf "\${release_dir}"
  done
fi

rm -rf "\${REMOTE_TMP_DIR}"
EOF

echo "Deployment finished."
