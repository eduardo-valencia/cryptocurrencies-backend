import request, { Test } from 'supertest'
import { tokens } from '@supercoder.dev/cryptocurrencies-common/dist/services/__mocks__/firebase'

import app from '../../../app'
import { route } from '../../favorites/route'

jest.mock(
  '../../../../node_modules/@supercoder.dev/cryptocurrencies-common/dist/services/firebase'
)

type RequestData = {
  user?: any
  currency?: any
}

const makeRequest = (data: RequestData, token: string = tokens.valid): Test => {
  return request(app)
    .post(route)
    .send(data)
    .set('Authorization', `Bearer ${token}`)
}

const testRequestThrowsError = (
  response: request.Response,
  status: number = 400
) => {
  expect(response.status).toEqual(status)
}

const makeRequestWithInvalidData = async (data: RequestData): Promise<void> => {
  const response: request.Response = await makeRequest(data)
  testRequestThrowsError(response)
}

it('Should throw an error when the user is missing', async () => {
  await makeRequestWithInvalidData({ currency: 'currency-id' })
})

it('Should throw an error when the currency is missing', async () => {
  await makeRequestWithInvalidData({ user: 'user' })
})

it('Should throw an error when you are not logged in', async () => {
  const response: request.Response = await makeRequest({}, tokens.invalid)
  testRequestThrowsError(response, 403)
})

const testBody = (
  response: request.Response,
  requestData: RequestData
): void => {
  expect(response.body).toHaveProperty('currency', requestData.currency)
  expect(response.body).toHaveProperty('userId', requestData.user)
}

it('Should create the favorite when you supply valid data', async () => {
  const requestData = { user: 'user', currency: 'currency' }
  const response: request.Response = await makeRequest(requestData)
  expect(response.status).toEqual(200)
  testBody(response, requestData)
})
