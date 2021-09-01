import dotenv from 'dotenv'

import { convertObjectToCamelCase } from '../utils/transform'

dotenv.config()

interface Keys {
  databaseHost: string
  databasePort: number
  databaseName: string
  databaseUser: string
  databasePassword: string
  port?: number
  googleApplicationCredentials: string
  publicUrl: string
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
    'databaseHost',
    'databasePort',
    'databaseName',
    'databaseUser',
    'databasePassword',
    'publicUrl',
  ]
  requiredKeys.forEach(validateKeyExists(camelCasedKeys))
}

validateKeys()

export default camelCasedKeys as Keys
