# wb-szplus-h5-special-v4

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


http://localhost:8080/#/40years-meeting

### 文件说明
```
@/assets/static/style/base.less     为全局less配置
@/assets/static/js/util.js          为全局公共js文件，包括唤醒，分享等方法
@/api/api.js						管理全局接口文件
@/api/http.js						对axios 进行二次方封装

.env.development 					为本地开发环境配置
.env.production  					为正式环境 配置
```

### .evn文件配置说明
```
NODE_ENV                   			环境类似
VUE_APP_API_URL                     请求API地址
VUE_APP_TAES                        代理地址
```

### 项目单位说明
```
集成postcss-px2rem 
默认为 75px = 1rem （设计图为750）
直接写px ,打包时会转为rem

组件库element-ui@2.x
```