// 路径
const path = require('path')
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 环境判断
const env = process.env.VUE_NODE_ENV === "dev" ? 'dev'
            : 'prod'
            // if (window.location.href.includes('192.168')) return 'test'; 
module.exports = {
    productionSourceMap:false,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    // 修改 入口
    pages:{
        index:{
            entry:'src/config/main.js', //入口
            template:'public/index.html',//模板
            filename:'index.html',//输出文件
        }
    },
    // 拓展 webpack 配置
    chainWebpack: config => {
        // 修改目录指向
        config.resolve.alias
            .set('@',path.resolve('src'))
            .set('@common',path.resolve('src/common'))
                .set('@assets',path.resolve('src/common/assets'))
                    .set('@img',path.resolve('src/common/assets/img')) //图片
                    .set('@css',path.resolve('src/common/assets/css')) //样式
                .set('@components',path.resolve('src/common/components'))  //组件
                .set('@directives',path.resolve('src/common/directives'))  //指令
                .set('@filter',path.resolve('src/common/filter'))      //过滤
                .set('@formatter',path.resolve('src/common/formatter'))   //格式化
                .set('@mixins',path.resolve('src/common/mixins'))      //混入
                .set('@utils',path.resolve('src/common/utils'))       //工具
            .set('@config',path.resolve('src/config'))
            .set('@views',path.resolve('src/views'))
        //  图片压缩
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })
            .end()
    },
    // 拓展 webpack 配置
    configureWebpack: config => {
        if(env === 'prod'){
            //  代码压缩    
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false, // 若打包错误，则注释这行
                        //生产环境自动删除console
                        compress: {
                            drop_debugger: true,
                            drop_console: true,
                            pure_funcs: ['console.log','console.error']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            )
            // gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: 'gzip', // 使用gzip压缩
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ), // 匹配文件名
                    filename: '[path][base].gz', // 压缩后的文件名(保持原文件名，后缀加.gz)
                    minRatio: 1, // 压缩率小于1才会压缩
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: true, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
                })
            )
        }
        
    },
    // 样式配置
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@assets/css/index.scss" ;`
            }
        }
    },
    // 代理配置
    devServer: {
        port: 997, //开发端口
        proxy: {
            '/api' : {
                target: 'http://localhost:8080/',
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    }
}