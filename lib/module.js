const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const defaults = {
    track: 'PAGE_VIEW',
    disabled: false
  }
  const options = {
    ...defaults,
    ...moduleOptions,
    ...this.options.snaptr
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-snapchat-tracker-module.js',
    options
  })
}

module.exports.meta = require('../package.json')
