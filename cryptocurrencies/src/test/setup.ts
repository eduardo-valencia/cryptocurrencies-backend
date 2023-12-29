import PgContext from './database'

let context: PgContext | null = null

beforeAll(async () => {
  context = await PgContext.setUp()
})

beforeEach(async () => {
  await context!.deleteTables()
})

afterAll(async () => {
  await context!.disconnect()
})
