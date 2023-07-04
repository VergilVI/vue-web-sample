module.exports = {
    devServer: {
        open: false,
        // host: "172.20.109.115",
        port: 8080,
        https: false,
        hotOnly: false, // https:{type:Boolean}
        proxy: {
            "/taes": {
                target: "https://www.szsgby.com", // 代理域名
                changeOrigin: true,
                pathRewrite: {
                    "^/taes": "",
                },
            },
        }, // 配置跨域处理,只有一个代理
    },
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 公共路径(必须有的)
    // outputDir: "dist", // 输出文件目录
    // assetsDir: "static", //静态资源文件名称
    // lintOnSave: false,  // eslint-loader 是否在保存的时候检查
    // runtimeCompiler: false, // 打包后小些
    productionSourceMap: false, //去除打包后js的map文件
    // css相关配置
    // css: {
    //     // 是否使用css分离插件 ExtractTextPlugin
    //     extract: true,
    //     // 开启 CSS source maps?
    //     sourceMap: false,
    //     // css预设器配置项 
    //     loaderOptions: {
    //         css: {},
    //         postcss: {
    //             plugins: [
    //                 // px转rem插件，仅在H5页面时才打开
    //                 require("postcss-px2rem")({
    //                     remUnit: 75,
    //                 }),
    //             ],
    //         },
    //     },
    //     // 启用 CSS modules for all css / pre-processor files.
    //     modules: false,
    // },
    //去掉console
    configureWebpack: (config) => {
        // 判断为生产模式下，因为开发模式我们是想保存console的
        if (process.env.NODE_ENV === "production") {
            config.optimization.minimizer.map((arg) => {
                const option = arg.options.terserOptions.compress;
                option.drop_console = true; // 打开开关
                return arg;
            });
        }
    },
};
