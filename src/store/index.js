import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import detail from './detail'
import { reqCategoryList,reqBannerList,reqFloorList} from '@/api'
import search from './search'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'


// 存数据
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
// 修改数据，同步
const mutations = {
    // categoryList
    RECEIVE_CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    // bannerList
    RECEIVE_BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    // floorList
    RECEIVE_FLOORLIST(state,bannerList){
        state.floorList = bannerList
    },
}
// 一般是异步发请求，与组件当中用户对接，提交mutations
const actions = {
    // categoryList
   async getCategoryList({commit}){
        // 发请求拿数据，提交mutatios，存到state
       const result = await reqCategoryList()
       if (result.code === 200) {
           commit('RECEIVE_CATEGORYLIST',result.data)
       }
    },
    // bannerList
    async getBannerList({commit}){
        // 发请求拿数据，提交mutatios，存到state
       const result = await reqBannerList()
       if (result.code === 200) {
           commit('RECEIVE_BANNERLIST',result.data)
       }
    },
    // floorList
    async getFloorList({commit}){
        // 发请求拿数据，提交mutatios，存到state
       const result = await reqFloorList()
       if (result.code === 200) {
           commit('RECEIVE_FLOORLIST',result.data)
       }
    },

}
// vuex的计算属性，后面用来简化数据的操作
const getters = {
 
}



export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        search,
        detail,
        shopCart,
        user,
        trade,
    }
})
