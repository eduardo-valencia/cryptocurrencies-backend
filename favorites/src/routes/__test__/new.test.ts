import request, { Test } from 'supertest'

import app from '../../app'
import { route } from '../route'

type RequestData = {
  user?: any
  currency?: any
}

const makeRequest = (data: RequestData): Test => {
  return request(app).post(route).send(data)
}

const testRequestThrowsError = (response: request.Response) => {
  expect(response.status).toEqual(400)
}

const makeRequestWithInvalidData = async (data: RequestData): Promise<void> => {
  const response: request.Response = await makeRequest(data)
  testRequestThrowsError(response)
}

it('Should throw an error when the user is missing', async () => {
  await makeRequestWithInvalidData({ currency: 'currency-id' })
})
