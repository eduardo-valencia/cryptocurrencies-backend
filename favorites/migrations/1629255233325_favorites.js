/* eslint-disable camelcase */

exports.shorthands = undefined

const tableName = 'favorites'

exports.up = (pgm) => {
  pgm.createTable(tableName, {
    id: 'id',
    user: {
      type: 'integer',
      notNull: true,
    },
    currency: {
      type: 'integer',
      notNull: true,
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable(tableName)
}
