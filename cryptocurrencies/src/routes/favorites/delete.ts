import ValidationError from '@supercoder.dev/backend-helpers/dist/errorsGenerators/ValidationError'
import validateParams from '@supercoder.dev/backend-helpers/dist/middlewares/paramsValidation'
import validateAuth from '@supercoder.dev/cryptocurrencies-common/dist/middlewares/validateAuth'
import { Request, Response } from 'express-serve-static-core'
import { param } from 'express-validator'
import { QueryResult } from 'pg'

import FavoriteRepo from '../../repos/Favorite'
import { createRouter } from '../../utils/router'

const router = createRouter()

const validators = [param('id').notEmpty().isNumeric()]

const handleRequest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const result: QueryResult = await FavoriteRepo.delete(id)
  if (result.rowCount === 0) {
    throw new ValidationError({ message: 'Invalid id' })
  }
  res.json({ message: 'Success' })
}

router.delete('/:id', validateAuth, validators, validateParams, handleRequest)

export default router
