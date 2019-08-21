'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //添加
  // API_ROOT: '"/api/"'
  BASE_API: '"/api"',
  // API_ROOT: '"http://gfwx.cqkjg.cn/"'
})
