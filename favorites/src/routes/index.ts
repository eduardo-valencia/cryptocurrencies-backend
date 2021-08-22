import { createRouter } from '../utils/router'
import { useRouters } from '@supercoder.dev/backend-helpers/dist/utils/routers'
import { Router } from 'express'

import newRouter from './new'
import deleteRouter from './delete'
import { route } from './route'

const router = createRouter()

const routers: Router[] = [newRouter, deleteRouter]

useRouters(routers, router, route)

export default router
