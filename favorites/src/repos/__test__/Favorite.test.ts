import FavoriteRepo from '../Favorite'
import PgContext from '../../test/database'

beforeAll(async () => {
  await PgContext.setUp()
})

describe('find by user', () => {
  it('Should return an empty array if it did not find results', async () => {
    const rows = await FavoriteRepo.findByUser('user')
    expect(rows).toHaveLength(0)
  })
})
