import { Request, Response } from 'express'
import request from 'supertest'
import handleError from '@supercoder.dev/backend-helpers/dist/middlewares/errorHandler'

import app from '@supercoder.dev/backend-helpers/dist/utils/tests/app'
import verifyAuth from '../validateAuth'
import { tokens } from '../../services/__mocks__/firebase'

jest.mock('../../services/firebase')

const route: string = '/'

const handleRequest = (req: Request, res: Response): void => {
  res.json({ message: 'Success' })
}

app.post(route, verifyAuth, handleRequest)
app.use(handleError)

const makeRequest = (token: string): request.Test =>
  request(app).post(route).set('Authorization', `Bearer ${token}`)

it('Should not throw an error if it has a valid token', async () => {
  const response = await makeRequest(tokens.valid)
  expect(response.status).toEqual(200)
})

it('Should throw an error when token is invalid', async () => {
  const response = await makeRequest(tokens.invalid)
  expect(response.status).toEqual(403)
})
