import { createRouter } from '../utils/router'
import { useRouters } from '@supercoder.dev/backend-helpers/dist/utils/routers'
import { Router } from 'express'

import newRouter from './new'
import deleteRouter from './delete'
import findByUserRouter from './findByUser'
import healthCheckRouter from './healthCheck'
import { route } from './route'

const router = createRouter()

const routers: Router[] = [newRouter, deleteRouter, findByUserRouter]

useRouters(routers, router, route)

router.use(healthCheckRouter)

export default router
