import FavoriteRepo from '../Favorite'
import PgContext from '../../test/database'

import Favorite from '@supercoder.dev/cryptocurrencies-common/src/collections/Favorite'

beforeAll(async () => {
  await PgContext.setUp()
})

describe('find by user', () => {
  it('Should return an empty array if it did not find results', async () => {
    const rows = await FavoriteRepo.findByUser('user')
    expect(rows).toHaveLength(0)
  })

  interface FavoriteTestData {
    favorite: Favorite
    expectedFavorite: Omit<Favorite, 'id'>
  }

  const addFavorite = async (): Promise<FavoriteTestData> => {
    const userId: string = 'hello'
    const currency: string = 'currency'
    const favorite = await FavoriteRepo.add(userId, currency)
    return {
      favorite,
      expectedFavorite: {
        userId: userId,
        currency,
      },
    }
  }

  it('Should return the favorites with the expected user ID', async () => {
    const { favorite, expectedFavorite } = await addFavorite()
    expect(favorite).toHaveProperty('userId', expectedFavorite.userId)
    expect(favorite).toHaveProperty('currency', expectedFavorite.currency)
  })
})
