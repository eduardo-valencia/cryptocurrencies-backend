import Favorite from '@supercoder.dev/cryptocurrencies-common/dist/collections/Favorite'
import validateParams from '@supercoder.dev/backend-helpers/dist/middlewares/paramsValidation'
import validateAuth from '@supercoder.dev/cryptocurrencies-common/dist/middlewares/validateAuth'
import { Request, Response } from 'express-serve-static-core'
import { query } from 'express-validator'

import FavoriteRepo from '../../repos/Favorite'
import { createRouter } from '../../utils/router'

const router = createRouter()

const validators = [query('userId').notEmpty().isString()]

const handleRequest = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.query
  const favorites: Favorite[] = await FavoriteRepo.findByUser(userId as string)
  res.json(favorites)
}

router.get('/', validateAuth, validators, validateParams, handleRequest)

export default router
