//这个是detail模块的vuex模块
import {reqAddShopCart,reqCartList,reqDeleteShopCart} from '@/api'

//vuex当中的4个核心概念  
const state = {
  //存数据
  shopCartList:[]
}
// state是vuex存储数据的地方，但是这个state并不是永久存储
// 当我们刷新页面或者重新启动项目（可以认为刷新页面就是重启了一下项目）
// 那么vuex当中所有的数据，都要重新初始化，重新发请求去获取
// state里面的数据一开始就是有的，只不过是我们初始化的，不是请求回来的
// 但是state这个初始化的数据，也会影响组件（组件也是可以获取这个初始化数据）

// 就是因为vue和vuex没办法去永久存储数据，才有以下两个存储方案
// localStorage
// sessionStorage

const mutations = {
  //直接修改数据
  REVICE_SHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  }
}

const actions = {
  //与组件当中用户对接
  //一般是异步发请求
  //提交mutations
  // 添加购物车
  async addShopCart({commit},{skuId,skuNum}){
    const result = await reqAddShopCart(skuId,skuNum)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  // 获取购物车列表
  async getShopCartList({commit}){
    const result = await reqCartList()
    if (result.code === 200) {
      commit("REVICE_SHOPCARTLIST",result.data)
    }
  },
  // 删除单个商品
  async deleteShopCart({commit},skuId){
    const result = await reqDeleteShopCart(skuId)
    if (result.code === 200) {
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  // 删除多个选中商品
  async deleteShopCartAll({commit,getters,dispatch}){
    let promises = []
    getters.cartInfo.cartInfoList.forEach(item => {
      if (!item.isChecked) return 
      let promise = dispatch('deleteShopCart',item.skuId)
      promises.push(promise)
    });
    return Promise.all(promises)
  }
}

const getters = {
  cartInfo(state){
    return state.shopCartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}