const { Client } = require('pg')

module.exports.migrationClient = function migrationClient () {
  return new Client({
    database: 'nselxcin-test',
    host: 'localhost',
    password: 'salish',
    port: 5432,
    user: 'nselxcin',
  })
}
