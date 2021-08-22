import keys from './keys'

const poolConfig = {
  host: keys.databaseHost,
  port: keys.databasePort,
  database: keys.databaseName,
  user: keys.databaseUser,
  password: keys.databasePassword,
}

export default poolConfig
