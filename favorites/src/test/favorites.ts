import Favorite from '@supercoder.dev/cryptocurrencies-common/dist/collections/Favorite'
import FavoriteRepo from '../repos/Favorite'

interface FavoriteTestData {
  favorite: Favorite
  expectedFavorite: Omit<Favorite, 'id'>
}

export const addFavorite = async (): Promise<FavoriteTestData> => {
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

export const expectFavoriteNotToExist = async (
  favorite: Favorite
): Promise<void> => {
  const favorites = await FavoriteRepo.findByUser(favorite.userId)
  expect(favorites).toHaveLength(0)
}
