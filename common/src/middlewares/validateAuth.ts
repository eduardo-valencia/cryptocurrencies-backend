import admin from '../services/firebase'
import { Request, Response, NextFunction } from 'express'
import NotAuthenticated from '@supercoder.dev/backend-helpers/src/errorsGenerators/NotAuthenticated'

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

const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // This may be incorrect because I may have to extract the token from the authorization header
  const isTokenValid: boolean = await getIfTokenIsValid(
    req.headers.authorization
  )
  if (isTokenValid) {
    return next()
  }
  throw new NotAuthenticated({ message: 'Your token is invalid' })
}

export default verifyAuth
