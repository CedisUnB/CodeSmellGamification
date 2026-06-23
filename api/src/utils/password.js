import bcrypt from 'bcrypt'

const DEFAULT_SALT_ROUNDS = 12
const configuredSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || DEFAULT_SALT_ROUNDS, 10)
const SALT_ROUNDS = Number.isInteger(configuredSaltRounds) && configuredSaltRounds >= DEFAULT_SALT_ROUNDS
    ? configuredSaltRounds
    : DEFAULT_SALT_ROUNDS

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS)
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
};

export const passwordNeedsRehash = (hashedPassword) => {
    return bcrypt.getRounds(hashedPassword) < SALT_ROUNDS
}
