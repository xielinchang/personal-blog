const name = process.env.VUE_APP_TITLE
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.TARGET,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      '/api': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      [process.env.VUE_APP_BASE_API_BAIDU ]: {
        target: process.env.TARGET_BAIDU, // 请求后台接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API_BAIDU ]: '' // 重写请求
        }
      }
    }
  },
  chainWebpack: config => {
    // svg 配置
    // config.module.rules.delete('svg') // 重点：删除默认配置中处理 svg
    config.module.rule('svg-sprite-loader').test(/\.svg$/)
      .include
      .add(path.resolve('./src/icons/svg')) // 处理 svg 保存路径
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]' // 给 symbol 配置 id
      })
    config.module.rule('svg').exclude.add(path.resolve('./src/icons/svg')) // 其他 svg loader 排除 svg 目录
  }
  /* configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|html)?$/i, // 压缩文件格式
        filename: '[path].gz[query]', // 压缩后的文件名
        algorithm: 'gzip', // 使用gzip压缩
        minRatio: 0.8, // 压缩率小于1才会压缩
        deleteOriginalAssets: true
      })
    ]
  } */
  /* chainWebpack: config => {
    // 压缩图片
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
  } */
}
