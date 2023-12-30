import { useRouters } from '@supercoder.dev/backend-helpers/dist/utils/routers'
import { Router } from 'express'

import { createRouter } from '../utils/router'
import newRouter from './favorites/new'
import deleteRouter from './favorites/delete'
import findByUserRouter from './favorites/findByUser'
import { favoritesPath } from './favorites/route'
import healthCheckRouter from './healthCheck'
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
