import express, { Request, Response } from 'express'

const router = express.Router()

const handleRequest = (req: Request, res: Response): void => {
  res.json({ message: 'Success' })
}

router.get('/', handleRequest)

export default router
