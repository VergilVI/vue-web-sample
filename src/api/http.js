//axios 二次封装
//2019/12/27 Liyao

import axios from 'axios'
import {
	Toast
} from 'vant'
if (process.env.NODE_ENV == 'production') { //如果是正式环境则 不弹框
	// Toast.fail = function(val) {
	// 	console.log(val)
	// }
}

import api from '@/api/api.js';
import store from '@/store/index'


const http = axios.create({
	timeout: 60000,
	headers: {
		'Content-Type': 'application/json; charset=UTF-8'
	},
	transformRequest: [function(data, headers) {
		headers.Authorization = store.state.token ? "Bearer " + store.state.token : null;
		if (headers['Content-type'] === 'multipart/form-data') {
			return data
		} else {
			return JSON.stringify(data)
		}
	}]
})

const httpPost = axios.create({   //纯净的axios，不用拦截器，用于文件上传。
	timeout: 60000,
	headers: {
		'Content-Type': 'multipart/form-data'
	},
})
var loadingInstance

// 请求拦截器
http.interceptors.request.use(config => {
	// 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
	if (process.env.NODE_ENV === 'development') {
		const {
			method
		} = config
		if (method === 'post' || method === 'put' || method === 'patch') {
			console.log(config.data)
		}
	}

	return config
})


// 响应拦截器
http.interceptors.response.use(res => {
	// loadingInstance.close()
	return res.data
}, error => {
	if (error && error.response) {
		switch (error.response.status) {
			case 400:
				error.message = '错误请求'
				break;
			case 401:
				error.message = '未授权，请重新登录'
				break;
			case 403:
				error.message = '拒绝访问'
				break;
			case 404:
				error.message = '请求错误,未找到该资源'
				break;
			case 405:
				error.message = '请求方法未允许'
				break;
			case 408:
				error.message = '请求超时'
				break;
			case 500:
				error.message = '服务器端出错'
				break;
			case 501:
				error.message = '网络未实现'
				break;
			case 502:
				error.message = '网络错误'
				break;
			case 503:
				error.message = '服务不可用'
				break;
			case 504:
				error.message = '网络超时'
				break;
			case 505:
				error.message = 'http版本不支持该请求'
				break;
			default:
				error.message = `连接错误${err.response.status}`
		}
	} else {
		err.message = "连接到服务器失败"
	}
	Toast.fail(error.message);
	return Promise.reject(error);
})


export default {
	httpPost(url, params,option = {}){
		return new Promise((resolve, reject) => {
			httpPost.post(url, params,option)
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					Toast.fail('请求失败,请稍后再试!');
					reject(url + '-->post出错');
				})
		})
	},
	get(url, params) {
		return new Promise((resolve, reject) => {
			http.get(url, {
					params: params
				})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					Toast.fail('请求失败,请稍后再试!');
					reject(url + '-->get出错')
				})
		})
	},
	post(url, params,option = {}) {
		return new Promise((resolve, reject) => {
			http.post(url, params,option)
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					Toast.fail('请求失败,请稍后再试!');
					reject(url + '-->post出错');
				})
		})
	},
	put(url, params = {}) {
		return new Promise((resolve, reject) => {
			http.put(url, params)
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					Toast.fail('请求失败,请稍后再试!');
					reject(url + '-->put出错');
				})
		})
	},
	delete(url, params = {}) {
		return new Promise((resolve, reject) => {
			http.delete(url, {
					params: params
				})
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					Toast.fail('请求失败,请稍后再试!');
					reject(url + '-->delete出错');
				})
		})
	},
	get2(url, param) { //带匿名token
		var hToken;
		return new Promise((resolve, reject) => {
			http.get(api.hiddenToken, {}).then(data => {
				if ((data.code = "000000")) {
					//alert(data.rtn.data);
					hToken = data.rtn.data;
					store.commit('SET_TOKEN',hToken);
					http.get(url, {
						params: param
					}).then((res) => {
						resolve(res.data)
					}).catch((error) => {
						reject(error)
					})
				} else {
					Toast.fail(data.message);
				}
			}).catch(error => {});

		})
	}
}
