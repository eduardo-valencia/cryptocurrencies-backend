import { createRouter } from '../utils/router'
import { useRouters } from '@supercoder.dev/backend-helpers/dist/utils/routers'

import newRouter from './new'
import { Router } from 'express'
import { route } from './route'

const router = createRouter()

const routers: Router[] = [newRouter]

useRouters(routers, router, route)

export default router
