import admin from '../services/firebase'
import { Request, Response, NextFunction } from 'express'
import NotAuthenticated from '@supercoder.dev/backend-helpers/dist/errorsGenerators/NotAuthenticated'

const getIfTokenIsValid = async (
  token: string | undefined
): Promise<boolean> => {
  if (!token) return false
  try {
    await admin.auth().verifyIdToken(token)
    return true
  } catch (error) {
    return false
  }
}

const getToken = (authorization?: string): string => {
  if (!authorization) throw new NotAuthenticated()
  const match = authorization.match(/Bearer (.+)/)
  if (!match) throw new NotAuthenticated()
  // The token group
  return match[1]
}

const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string = getToken(req.headers.authorization)
  const isTokenValid: boolean = await getIfTokenIsValid(token)
  if (isTokenValid) {
    return next()
  }
  throw new NotAuthenticated()
}

export default verifyAuth
