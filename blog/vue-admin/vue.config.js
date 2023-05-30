const name = process.env.VUE_APP_TITLE
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    lintOnSave: process.env.NODE_ENV === 'development',
    outputDir: 'vue-admin',
    chainWebpack: config => {
        config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader')
    },
    devServer: {
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.TARGET,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    configureWebpack: {
        name: name,
        plugins: []
    }
}
