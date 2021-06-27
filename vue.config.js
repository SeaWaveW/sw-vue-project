const path = require('path')
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
        },
    }
}