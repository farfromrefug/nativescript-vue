const webpack = require('@nativescript/webpack')
const path = require('path')

module.exports = env => {
  webpack.init(env)

  // force the vue config, since we don't have nativescript-vue in package.json
  webpack.useConfig('vue')

  webpack.chainWebpack(config => {
    config.set('snapshot', {
      managedPaths: []
    })

    config.resolve.alias
      // resolve nativescript-vue to built version in parent folder
      .set('nativescript-vue', path.resolve(__dirname, '../dist/index.js'))
      // resolve nativescript-toasty to the updated version scoped under @triniwiz
      .set('nativescript-toasty', '@triniwiz/nativescript-toasty')

    config.module
      .rule('vue')
      .use('vue-loader')
      .options({
        compiler: require('nativescript-vue-template-compiler')
      })
  })

  return webpack.resolveConfig()
}
