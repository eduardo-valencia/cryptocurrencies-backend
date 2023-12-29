import pg from 'pg'

import keys from './keys'

const poolConfig: pg.PoolConfig = {
  connectionString: keys.databaseUrl,
}

export default poolConfig
