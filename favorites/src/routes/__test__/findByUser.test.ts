import request, { Test } from 'supertest'
import { tokens } from '@supercoder.dev/cryptocurrencies-common/dist/services/__mocks__/firebase'

import app from '../../app'
import Favorite from '@supercoder.dev/cryptocurrencies-common/dist/collections/Favorite'
import { addFavorite } from '../../test/favorites'
import { route } from '../route'
import FavoriteRepo from '../../repos/Favorite'

jest.mock(
  '../../../node_modules/@supercoder.dev/cryptocurrencies-common/dist/services/firebase'
)

const makeRequest = (
  userId: Favorite['userId'],
  token: string = tokens.valid
): Test => {
  return request(app)
    .get(`${route}?userId=${userId}`)
    .set('Authorization', `Bearer ${token}`)
}

it('Should throw an error when you are not logged in', async () => {
  const response: request.Response = await makeRequest('user', tokens.invalid)
  expect(response.status).toEqual(403)
})

it('Should return the list of favorites that match the user', async () => {
  await FavoriteRepo.add('otherUser', 'currency')
  const { favorite } = await addFavorite()
  const { body: favorites } = await makeRequest(favorite.userId)
  expect(favorites).toHaveLength(1)
  expect(favorites[0]).toEqual(favorite)
})
