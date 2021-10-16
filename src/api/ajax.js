// 对axios进行二次封装
// 让axios发请求时，具有其他功能
// 配置基础路径和超时限制
// 添加进度条信息 nprogress
// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
// 统一处理请求错误，具体请求也可以选择处理或不处理

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getTempId from "../utils/userabout"
import store from '@/store'
// 创建一个新的axios进行封装
// axios.create()进行创建
const service = axios.create({
    // 配置基础路径和超时限制
    baseURL: '/api', //设置公共基础路径
    timeout: 20000,
  });

// 添加进度条信息 nprogress
// 以后如果你想对axios添加额外的功能或者是给请求头添加额外的信息
// 必然用到axios的请求拦截器和响应拦截器
// 请求拦截器
service.interceptors.request.use(
    // 请求拦截器成功的回调
    (config)=>{
        // congig其实就是我们的请求报文
        // config最后得返回去
        // 再这里我们可以添加额外的功能，也可以给请求头添加需要的数据
        NProgress.start() //开启进度条

        // 请求头内部需要添加临时标识，后面每个请求都会带上临时标识
        config.headers.userTempId = getTempId()
        let token = store.state.user.token
        if (token) {
            config.headers.token = token
        }
        return config
    },
    // 请求拦截器当中失败的回调一般不写，因为失败了，就没有下文了
    // ()=>{

    // }

);

// 响应拦截器
service.interceptors.response.use(
    (response)=>{
        // response其实就我们的响应报文
        NProgress.done();//停止进度条
        return response.data //返回的响应就我们要的数据

    },
    (error)=>{
        NProgress.done();//停止进度条
        // 统一处理错误
        alert('发送ajax请求失败'+Error.message||'未知错误');
        // 统一处理完成之后，这个错误可以让后面继续处理，也可以不处理
        return Promise.reject(new Error('发送ajax请求失败'));
        // 也可以不让后面处理错误，中断promise链
        // return new Promise(()=>{})
    }
);

export default service