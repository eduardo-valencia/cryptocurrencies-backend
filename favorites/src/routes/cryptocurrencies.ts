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

cryptocurrenciesRouter.get(
  '/crypto/*',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const response: AxiosResponse = await fetchFromCoinGecko(req)
      res.send(response.data)
    } catch (error: unknown) {
      res
        .status(500)
        .send('Sorry, there was a problem. Please try again later.')
    }
  }
)
