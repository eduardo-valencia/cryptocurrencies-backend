import dotenv from 'dotenv'

import { convertObjectToCamelCase } from '../utils/transform'

dotenv.config()

interface Keys {
  databaseHost: string
  databasePort: number
  databaseName: string
  databaseUser: string
  databasePassword: string
}

const getCamelCasedKeys = () => convertObjectToCamelCase(process.env)

const validateKeyExists =
  (keys: Object) =>
  (key: keyof Keys): void => {
    if (!keys.hasOwnProperty(key)) {
      throw new Error(`${key} is missing in the environment variables.`)
    }
  }

const camelCasedKeys = getCamelCasedKeys()

const validateKeys = () => {
  const requiredKeys: (keyof Keys)[] = [
    'databaseHost',
    'databasePort',
    'databaseName',
    'databaseUser',
    'databasePassword',
  ]
  requiredKeys.map(validateKeyExists(camelCasedKeys))
}

validateKeys()

export default camelCasedKeys as Keys
