import bcrypt from 'bcrypt'
const saltRounds = 10

const encrypt = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds)
}

const compare = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

export { encrypt, compare }
