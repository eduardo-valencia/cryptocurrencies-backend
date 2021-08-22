import Favorite from '@supercoder.dev/cryptocurrencies-common/src/collections/Favorite'

import adapter from '../services/pool'

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
    return rows
  }
}

export default FavoriteRepo
