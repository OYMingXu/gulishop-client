import {reqTradeInfo, reqUserAddressList } from '@/api'
// 存数据
const state = {
    userAddressList:[],
    tradeInfo:{}
}
// 修改数据，同步
const mutations = {
    // // categoryList
    // RECEIVE_CATEGORYLIST(state,categoryList){
    //     state.categoryList = categoryList
    // },
    RECEIVE_USERADDRESSLIST(state,userAddressList){
        state.userAddressList = userAddressList
    },
    // 订单详情页面
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    }
}
// 一般是异步发请求，与组件当中用户对接，提交mutations
const actions = {
    // 获取用户地址信息
    async getUserAddressList({commit}){
        const result = await reqUserAddressList()
        if (result.code === 200) {
            commit('RECEIVE_USERADDRESSLIST',result.data)
        }
    },
    // 获取订单详情
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if (result.code === 200) {
            commit('RECEIVE_TRADEINFO',result.data)
        }
    }
}
// vuex的计算属性，后面用来简化数据的操作
const getters = {
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || []
    },
    orderDetailVoList(state){
        return state.tradeInfo.orderDetailVoList || []
    },
}
export default {
    state,
    mutations,
    actions,
    getters
  }
