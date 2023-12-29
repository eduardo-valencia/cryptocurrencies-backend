import { createRouter } from '../utils/router'
import { useRouters } from '@supercoder.dev/backend-helpers/dist/utils/routers'
import { Router } from 'express'

import newRouter from './favorites/new'
import deleteRouter from './favorites/delete'
import findByUserRouter from './favorites/findByUser'
import healthCheckRouter from './healthCheck'
import { route } from './favorites/route'
import { cryptocurrenciesRouter } from './cryptocurrencies'

const router = createRouter()

const routers: Router[] = [newRouter, deleteRouter, findByUserRouter]

useRouters(routers, router, route)

router.use('/api', cryptocurrenciesRouter)
router.use(healthCheckRouter)

export default router
