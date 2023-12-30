import request, { Test } from 'supertest'
import { tokens } from '@supercoder.dev/cryptocurrencies-common/dist/services/__mocks__/firebase'

import Favorite from '@supercoder.dev/cryptocurrencies-common/dist/collections/Favorite'
import app from '../../../app'
import { addFavorite, expectFavoriteNotToExist } from '../../../test/favorites'
import { route } from '../route'

jest.mock(
  '../../../../node_modules/@supercoder.dev/cryptocurrencies-common/dist/services/firebase'
)

const makeRequest = (
  id: Favorite['id'],
  token: string = tokens.valid
): Test => {
  return request(app)
    .delete(`${route}${id}`)
    .set('Authorization', `Bearer ${token}`)
}

it('Should throw an error when you are not logged in', async () => {
  const response: request.Response = await makeRequest('1', tokens.invalid)
  expect(response.status).toEqual(403)
})

it('Should delete the favorite when you supply a valid id', async () => {
  const { favorite } = await addFavorite()
  const response: request.Response = await makeRequest(favorite.id)
  expect(response.status).toEqual(200)
  expectFavoriteNotToExist(favorite)
})

it('Should return an error when the favorite does not exist', async () => {
  const response: request.Response = await makeRequest('1')
  expect(response.status).toEqual(400)
})
