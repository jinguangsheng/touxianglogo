const path = require('path')
// svg路径
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  // css: {
  //   loaderOptions: {
  //       css: {
  //           // options here will be passed to css-loader
  //       },
  //       postcss: {
  //           // options here will be passed to postcss-loader
  //           plugins: [require('postcss-px2rem')({
  //               remUnit: 75
  //           })]
  //       }
  //   }
  // },
  configureWebpack: {
    module: {
      // 除了src/assets/svg其他都编译
      // 不加这个的话下面svg-sprite-loader的时候会把他们一起编译
      // 然后css和页面里的svg就不能显示了
      rules: [
        {
          test: /\.(svg)(\?.*)?$/,
          exclude: [resolve('src/assets/svg')],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    externals: {
      // 'vue': 'Vue',
      // 'element-ui': 'ELEMENT'
      // 'Vant': 'Vant'
    },
    //警告 webpack 的性能提示
    // performance: {
    //   hints:'warning',  // 枚举
    //   //入口起点的最大体积,整数类型（以字节为单位）
    //   maxEntrypointSize: 50000000,
    //   //生成文件的最大体积,整数类型（以字节为单位）
    //   maxAssetSize: 30000000,
    //   //只给出 js 文件的性能提示, 提供资源文件名的断言函数
    //   assetFilter: function(assetFilename) {
    //     return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    //   }
    // }
  },
    /**这里之后，还有第一行的path是跟svg有关系的配置**/
  chainWebpack: config => {
     // 处理svg
     config.module.rules.delete('svg')
     config.module
       .rule('svg-sprite-loader')
       .test(/\.svg$/)
       .include
       .add(resolve('src/assets/svg')) //处理svg目录
       .end()
       .use('svg-sprite-loader')
       .loader('svg-sprite-loader')
       .options({
         symbolId: 'icon-[name]'
       })
    //    .end()
    //    .use('svgo-loader')
    //    .loader('svgo-loader')
    //    .options({
    //      externalConfig: "svgo.config.yml"
    //    })
  }
}