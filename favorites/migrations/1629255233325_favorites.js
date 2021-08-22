/* eslint-disable camelcase */

exports.shorthands = undefined

const tableName = 'favorites'

exports.up = (pgm) => {
  pgm.createTable(tableName, {
    id: 'id',
    user: {
      type: 'varchar(50)',
      notNull: true,
    },
    currency: {
      type: 'varchar(50)',
      notNull: true,
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable(tableName)
}
