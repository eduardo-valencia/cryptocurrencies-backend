import { Request, Response } from 'express'
import request from 'supertest'
import handleError from '@supercoder.dev/backend-helpers/src/middlewares/errorHandler'

import app from '@supercoder.dev/backend-helpers/src/utils/tests/app'
import verifyAuth from '../validateAuth'

const route: string = '/'

const handleRequest = (req: Request, res: Response): void => {
  res.json({ message: 'Success' })
}

app.post(route, verifyAuth, handleRequest)
app.use(handleError)

const makeRequest = (token: string) =>
  request(app).post(route).set('Authorization', 'Bearer valid')
