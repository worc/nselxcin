require('dotenv').config({ path: `${__dirname}/../../.env`})
const { Client } = require('pg')

module.exports.migrationClient = function migrationClient () {
  return new Client({
    database: process.env.DB_NAME || 'nselxcin-test',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'salish',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'nselxcin',
  })
}
