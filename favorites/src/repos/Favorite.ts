import Favorite from '@supercoder.dev/cryptocurrencies-common/src/collections/Favorite'

import adapter from '../services/pool'
import { convertObjectToCamelCase } from '../utils/transform'
import { convertRowsToCamelCase } from '../utils/transformRows'

class FavoriteRepo {
  static findByUser = async (user: Favorite['user']): Promise<Favorite[]> => {
    const { rows } = await adapter.pool!.query(
      `
      SELECT *
      FROM favorites
      WHERE user = $1;
    `,
      [user]
    )
    return convertRowsToCamelCase<Favorite>(rows)
  }

  static add = async (
    user: Favorite['user'],
    currency: Favorite['currency']
  ): Promise<Favorite> => {
    const { rows } = await adapter.pool!.query(
      `
      INSERT INTO favorites
      (user, currency)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [user, currency]
    )
    const [newFavorite] = rows
    return convertObjectToCamelCase<Favorite>(newFavorite)
  }
}

export default FavoriteRepo
