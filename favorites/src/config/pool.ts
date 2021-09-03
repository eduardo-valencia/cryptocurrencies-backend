import pg from 'pg'

import keys from './keys'

const poolConfig: pg.PoolConfig = {
  connectionString: keys.databaseConnectionString,
}

export default poolConfig
