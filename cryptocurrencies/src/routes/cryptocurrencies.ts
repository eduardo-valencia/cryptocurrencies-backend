import { Router, Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { createRouter } from '../utils/router'
import keys from '../config/keys'

export const cryptocurrenciesRouter: Router = createRouter()

const fetchFromCoinGecko = (req: Request): Promise<AxiosResponse> => {
  return axios.get(req.path, {
    baseURL: 'https://api.coingecko.com/api/v3',
    params: req.query,
    headers: { 'x-cg-demo-api-key': keys.coinGeckoApiKey },
  })
}

const handleError = (error: unknown, res: Response): void => {
  console.error(error)
  res
    .status(500)
    .json({ message: 'Sorry, there was a problem. Please try again later.' })
}

const handleRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    const response: AxiosResponse = await fetchFromCoinGecko(req)
    res.send(response.data)
  } catch (error: unknown) {
    handleError(error, res)
  }
}

const createRoute = (path: string): void => {
  cryptocurrenciesRouter.get(path, handleRequest)
}

/**
 * We create a route for each path we want to proxy to CoinGecko instead of
 * accepting a wildcard. This prevents mailicious requests from being made to
 * CoinGecko using our API token.
 */
const createRoutes = (): void => {
  const paths: string[] = [
    '/coins/markets',
    '/coins/:id',
    '/coins/:id/market_chart',
    '/search/trending',
  ]
  paths.forEach(createRoute)
}

createRoutes()
