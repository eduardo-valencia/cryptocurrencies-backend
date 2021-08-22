import migrate from 'node-pg-migrate'
import poolConfig from '../config/pool'

import adapter from '../services/pool'

class PgContext {
  static getRoleId = (): string => {
    const milliseconds: number = Date.now()
    // To make a unique role name
    return `testing${milliseconds}`
  }

  role: string = PgContext.getRoleId()

  testPoolOptions = {
    ...poolConfig,
    user: this.role,
    password: this.role,
  }

  createRole = async (): Promise<void> => {
    await adapter.pool!.query(`
      CREATE ROLE ${this.role}
      WITH LOGIN PASSWORD '${this.role}';
    `)
  }

  createSchema = async (): Promise<void> => {
    await adapter.pool!.query(`
      CREATE SCHEMA ${this.role}
      AUTHORIZATION ${this.role};
    `)
  }

  connectToMainPool = async (): Promise<void> => {
    await adapter.connect(poolConfig)
  }

  setupPermissions = async (): Promise<void> => {
    await this.createRole()
    await this.createSchema()
    await adapter.pool!.end()
  }

  runMigrations = async (): Promise<void> => {
    await migrate({
      schema: this.role,
      direction: 'up',
      dir: 'migrations',
      migrationsTable: 'migrations',
      count: 1,
      databaseUrl: this.testPoolOptions,
    })
  }

  connectToTestPool = async (): Promise<void> => {
    adapter.connect(this.testPoolOptions)
  }

  deleteTables = async (): Promise<void> => {
    await adapter.pool!.query(`
      DELETE FROM favorites;
    `)
  }

  removeSchema = async (): Promise<void> => {
    await adapter.pool!.query(`DROP SCHEMA ${this.role} CASCADE;`)
  }

  removeRole = async (): Promise<void> => {
    await adapter.pool!.query(`DROP ROLE ${this.role};`)
  }

  removeRolesAndSchema = async (): Promise<void> => {
    await this.removeSchema()
    await this.removeRole()
  }

  disconnect = async (): Promise<void> => {
    await this.removeRolesAndSchema()
    await adapter.pool!.end()
  }

  static setUp = async (): Promise<PgContext> => {
    const context: PgContext = new PgContext()
    await context.connectToMainPool()
    await context.setupPermissions()
    await context.runMigrations()
    await context.connectToTestPool()
    return context
  }
}

export default PgContext
