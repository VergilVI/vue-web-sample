
import axios from 'axios';

const service = {

}

service.apiService = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 20000 // 请求超时时间
})



// 响应拦截器
service.apiService.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.code || 200;
    // 获取错误信息
    const msg = res.message
   
    return res.data
},
    error => {
        console.log('err' + error)
      
        return Promise.reject(error)
    }
)


export default service
