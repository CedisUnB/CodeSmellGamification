export const validateIdParam = (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id);
    
    if (isNaN(numericId) || numericId <= 0) {
        return res.status(400).json({ 
            error: 'ID inválido. O parâmetro deve ser um número positivo.' 
        });
    }
    
    req.params.id = numericId;
    next();
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{8,128}$/
const SMELL_TYPES = new Set([
    'MYSTERIOUS_NAME',
    'DUPLICATED_CODE',
    'LONG_METHOD',
    'LONG_PARAMETER_LIST',
    'GLOBAL_DATA',
    'MUTABLE_DATA',
    'DIVERGENT_CHANGE',
    'SHOTGUN_SURGERY',
    'FEATURE_ENVY',
    'DATA_CLUMPS',
    'PRIMITIVE_OBSESSION',
    'REPEATED_SWITCHES',
    'LAZY_ELEMENT',
    'SPECULATIVE_GENERALITY',
    'TEMPORARY_FIELD',
    'MESSAGE_CHAINS',
    'MIDDLE_MAN',
    'LARGE_CLASS',
    'COMMENTS'
])

const isStringInRange = (value, min, max) => (
    typeof value === 'string' &&
    value.trim().length >= min &&
    value.trim().length <= max
)

const isValidSessionId = (sessionId) => (
    typeof sessionId === 'string' &&
    SESSION_ID_PATTERN.test(sessionId)
)

export const validateAnonymousLoginBody = (req, res, next) => {
    const { sessionId } = req.body || {}

    if (!isValidSessionId(sessionId)) {
        return res.status(400).json({ error: 'sessionId inválido.' })
    }

    next()
}

export const validateLoginBody = (req, res, next) => {
    const { email, password, sessionId } = req.body || {}

    if (!isStringInRange(email, 3, 254) || !EMAIL_PATTERN.test(email.trim())) {
        return res.status(400).json({ error: 'Email inválido.' })
    }

    if (!isStringInRange(password, 1, 128)) {
        return res.status(400).json({ error: 'Senha inválida.' })
    }

    if (sessionId !== undefined && !isValidSessionId(sessionId)) {
        return res.status(400).json({ error: 'sessionId inválido.' })
    }

    next()
}

export const validateRegisterBody = (req, res, next) => {
    const { name, email, password, sessionId } = req.body || {}

    if (!isStringInRange(name, 3, 80)) {
        return res.status(400).json({ error: 'Nome inválido.' })
    }

    if (!isStringInRange(email, 3, 254) || !EMAIL_PATTERN.test(email.trim())) {
        return res.status(400).json({ error: 'Email inválido.' })
    }

    if (!isStringInRange(password, 6, 128)) {
        return res.status(400).json({ error: 'Senha inválida.' })
    }

    if (sessionId !== undefined && !isValidSessionId(sessionId)) {
        return res.status(400).json({ error: 'sessionId inválido.' })
    }

    next()
}

export const validateAttemptBody = (req, res, next) => {
    const { attempt } = req.body || {}

    if (!Array.isArray(attempt) || attempt.length > 200) {
        return res.status(400).json({ error: 'Tentativa inválida.' })
    }

    const seenLines = new Set()
    for (const item of attempt) {
        if (
            !item ||
            !Number.isInteger(item.line) ||
            item.line <= 0 ||
            item.line > 10000 ||
            typeof item.smell !== 'string' ||
            !SMELL_TYPES.has(item.smell) ||
            seenLines.has(item.line)
        ) {
            return res.status(400).json({ error: 'Tentativa contém linhas ou classificações inválidas.' })
        }

        seenLines.add(item.line)
    }

    next()
}
