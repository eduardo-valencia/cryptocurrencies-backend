import { createRouter } from '../utils/router'
import { useRouters } from '@supercoder.dev/backend-helpers/dist/utils/routers'
import { Router } from 'express'

import newRouter from './favorites/new'
import deleteRouter from './favorites/delete'
import findByUserRouter from './favorites/findByUser'
import healthCheckRouter from './healthCheck'
import { favoritesPath } from './favorites/route'
import { cryptocurrenciesRouter } from './cryptocurrencies'

const mainRouter: Router = createRouter()
const apiRouter: Router = createRouter()

mainRouter.use(healthCheckRouter)
mainRouter.use('/api', apiRouter)

/**
 * API routes
 */
apiRouter.use('/crypto', cryptocurrenciesRouter)

const useFavoriteRouters = (): void => {
  const routers: Router[] = [newRouter, deleteRouter, findByUserRouter]
  useRouters(routers, apiRouter, favoritesPath)
}

useFavoriteRouters()

export default mainRouter
