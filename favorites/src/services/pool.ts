import pg, { Pool } from 'pg'

class PoolAdapter {
  pool: Pool | null

  constructor() {
    this.pool = null
  }

  private testConnection = async (): Promise<void> => {
    try {
      await this.pool!.query('SELECT 0 + 0;')
    } catch (error) {
      throw new Error(`Database connection error. ${error.message}`)
    }
  }

  public connect = async (options: pg.PoolConfig): Promise<void> => {
    this.pool = new Pool(options)
    await this.testConnection()
  }
}

export default new PoolAdapter()
