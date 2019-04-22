'use strict'
//console.log(__dirname + '/locales')

let i18n = {
    plugin: require('hapi-i18n'),
    options: {
      locales: ['de', 'en', 'fr'],
      directory: __dirname + '/locales',
      defaultLocale: 'en'
    }
  }
module.exports = {i18n}