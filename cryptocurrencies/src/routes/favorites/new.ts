import Favorite from '@supercoder.dev/cryptocurrencies-common/dist/collections/Favorite'
import validateParams from '@supercoder.dev/backend-helpers/dist/middlewares/paramsValidation'
import validateAuth from '@supercoder.dev/cryptocurrencies-common/dist/middlewares/validateAuth'
import { Request, Response } from 'express-serve-static-core'
import { body } from 'express-validator'

import FavoriteRepo from '../../repos/Favorite'
import { createRouter } from '../../utils/router'

const router = createRouter()

const validators = [
  body('user').notEmpty().isString(),
  body('currency').notEmpty().isString(),
]

const handleRequest = async (req: Request, res: Response): Promise<void> => {
  const { user, currency } = req.body
  const favorite: Favorite = await FavoriteRepo.add(user, currency)
  res.json(favorite)
}

router.post('/', validateAuth, validators, validateParams, handleRequest)

export default router
