'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/split-layout.cjs.prod.js')
} else {
  module.exports = require('./dist/split-layout.cjs.js')
}
