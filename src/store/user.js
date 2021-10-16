import { reqGetCode, reqGetUserInfo, reqLogout, reqRegister, reqUserLogin } from "@/api"
import getTempId from "../utils/userabout"
// 存数据
const state = {
    //存数据
    userTempId:getTempId(),
    code:'',
    // token:'',
    token:localStorage.getItem('TOKEN_KEY'),
    userInfo:'',
}
// 修改数据，同步
const mutations = {
   RECEIVE_CODE(state,code){
       state.code = code
   },
   RECEIVE_TOKEN(state,token){
       state.token = token
   },
   RECEIVE_USERINFO(state,userInfo){
       state.userInfo = userInfo
   },
   RESET_USER(state){
       state.token = '',
       state.userInfo = {}
   }
}
// 一般是异步发请求，与组件当中用户对接，提交mutations
const actions = {
    async userRegister({commit},userInfo){
        const result = await reqRegister(userInfo)
        if (result.code === 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // 请求获取code
    async getCode({commit},phone){
        const result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('RECEIVE_CODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'+error.message))
        }
    },
    // 请求登录接口,拿到token
    async userLogin({commit},userInfo){
        const result = await reqUserLogin(userInfo)
        if (result.code === 200) {
            commit('RECEIVE_TOKEN',result.data.token)
            localStorage.setItem('TOKEN_KEY',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    // // 根据token请求获取用户信息
    async getUserInfo({commit}){
        const result = await reqGetUserInfo()
        if (result.code === 200) {
            commit('RECEIVE_USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'+error.message))
        }
    },
    // 清除用户的token
    // async clearToken({commit}){
    //     commit('RESET_USER')
    //     localStorage.removeItem('TOKEN_KEY')
    // },
    // 请求退出登录接口
    async userLogout({commit}){
        const result = await reqLogout()
        if (result.code === 200) {
            commit('RESET_USER')
            localStorage.removeItem('TOKEN_KEY')
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'+error.message))
        }
    }
}
// vuex的计算属性，后面用来简化数据的操作
const getters = {
    
}
export default {
    state,
    mutations,
    actions,
    getters
  }