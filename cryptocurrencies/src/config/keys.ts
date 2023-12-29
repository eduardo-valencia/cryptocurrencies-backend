import dotenv from 'dotenv'

import { convertObjectToCamelCase } from '../utils/transform'

dotenv.config()

interface Keys {
  port?: number
  googleApplicationCredentials: string
  publicUrl: string
  firebaseProjectId: string
  firebasePrivateKey: string
  firebaseClientEmail: string
  databaseUrl: string
  coinGeckoApiKey: string
}

const getCamelCasedKeys = (): object =>
  convertObjectToCamelCase<object>(process.env)

const validateKeyExists =
  (keys: Object) =>
  (key: keyof Keys): void => {
    if (!keys.hasOwnProperty(key)) {
      throw new Error(`${key} is missing in the environment variables.`)
    }
  }

const camelCasedKeys: object = getCamelCasedKeys()

const validateKeys = () => {
  const requiredKeys: (keyof Keys)[] = [
    'databaseUrl',
    'publicUrl',
    'firebaseProjectId',
    'firebasePrivateKey',
    'firebaseClientEmail',
    'coinGeckoApiKey',
  ]
  requiredKeys.forEach(validateKeyExists(camelCasedKeys))
}

validateKeys()

export default camelCasedKeys as Keys
