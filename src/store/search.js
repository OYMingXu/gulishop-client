import {reqSearchInfo } from '@/api'
// 存数据
const state = {
    searchInfo:{}
}
// 修改数据，同步
const mutations = {
    // // categoryList
    // RECEIVE_CATEGORYLIST(state,categoryList){
    //     state.categoryList = categoryList
    // },
    RECEIVE_SEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo
    }
}
// 一般是异步发请求，与组件当中用户对接，提交mutations
const actions = {
    // categoryList
//    async getCategoryList({commit}){
//         // 发请求拿数据，提交mutatios，存到state
//        const result = await reqCategoryList()
//        if (result.code === 200) {
//            commit('RECEIVE_CATEGORYLIST',result.data)
//        }
//     },
    async getSearchInfo({commit},searchParams){
        const result = await reqSearchInfo(searchParams)
        if (result.code === 200) {
          commit('RECEIVE_SEARCHINFO',result.data)
         }
    }
}
// vuex的计算属性，后面用来简化数据的操作
const getters = {
    trademarkList(state){
        return state.searchInfo.trademarkList || []
    },
    attrsList(state){
        return state.searchInfo.attrsList || []
    },
    goodsList(state){
        return state.searchInfo.goodsList || []
    },

}
export default {
    state,
    mutations,
    actions,
    getters
  }
