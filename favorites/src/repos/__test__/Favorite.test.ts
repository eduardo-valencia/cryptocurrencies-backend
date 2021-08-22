import FavoriteRepo from '../Favorite'

import { addFavorite, expectFavoriteNotToExist } from '../../test/favorites'

describe('find by user', () => {
  it('Should return an empty array if it did not find results', async () => {
    const rows = await FavoriteRepo.findByUser('user')
    expect(rows).toHaveLength(0)
  })

  it('Should return the list of favorites', async () => {
    const { favorite } = await addFavorite()
    const favorites = await FavoriteRepo.findByUser(favorite.userId)
    expect(favorites[0]).toEqual(favorite)
  })
})

describe('Adding favorite', () => {
  it('Should return the favorite', async () => {
    const { favorite, expectedFavorite } = await addFavorite()
    expect(favorite).toHaveProperty('userId', expectedFavorite.userId)
    expect(favorite).toHaveProperty('currency', expectedFavorite.currency)
  })
})

describe('Deleting favorite', () => {
  it('Should remove the favorite', async () => {
    const { favorite } = await addFavorite()
    await FavoriteRepo.delete(favorite.id)
    await expectFavoriteNotToExist(favorite)
  })
})
