import { createRouter } from '../utils/router'
import { useRouters } from '@supercoder.dev/backend-helpers/dist/utils/routers'
import { Router } from 'express'

import newRouter from './favorites/new'
import deleteRouter from './favorites/delete'
import findByUserRouter from './favorites/findByUser'
import healthCheckRouter from './healthCheck'
import { route as favoritesRoute } from './favorites/route'
import { cryptocurrenciesRouter } from './cryptocurrencies'

const router: Router = createRouter()

router.use(healthCheckRouter)
router.use('/api/crypto', cryptocurrenciesRouter)

const useFavoriteRouters = (): void => {
  const routers: Router[] = [newRouter, deleteRouter, findByUserRouter]
  useRouters(routers, router, favoritesRoute)
}

useFavoriteRouters()

export default router
