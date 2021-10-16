// 这个文件写的接口函数
// 每个接口对应一个函数如果想要接口数据，只需调用相关函数
import request from './ajax'
import mockAjax from '@/api/mockAjax'


// 请求三级分类列表数据
export const reqCategoryList = () => {
    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
// 验证请求是否成功
// reqCategoryList() // 如果这里要调用，得把模块引入到main当中


// 请求获取mock数据banner
export const reqBannerList = () => {
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}
 // 请求获取mock数据floor
export const reqFloorList = () => {
    return mockAjax({
        url:'/floor',
        method:'get'
    })
}
// 请求获取搜索列表
export const reqSearchInfo = (searchParams) => {
    return request({
        url:'/list',
        method:'post',
        data:searchParams
    })
}
// 请求获取搜索列表mock接口模拟
// export const reqSearchList = () => {
//     return mockAjax({
//         url:'/search',
//         method:'get',
//     })
// }

// 请求获取商品详情
export const reqDetailInfo = (id) => {
    return request({
        url:`/item/${ id }`,
        method:'get',
    })
}

// 请求添加购物车
export const reqAddShopCart = (skuId,skuNum) => {
    return request({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}
// 请求获取购物车列表
export const reqCartList = () =>{
    return request({
        url:'/cart/cartList',
        method:'get',
    })
}
// 请求删除购物车商品
export const reqDeleteShopCart = (skuId) =>{
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete',
    })
}

// 请求获取登陆接口
export const reqUserLogin = (userInfo) =>{
    return request({
        url:'/user/passport/login',
        method:'post',
        data:userInfo
    })
}

// 请求获取注册接口
export const reqRegister = (userInfo) =>{
    return request({
        url:'user/passport/register',
        method:'post',
        data:userInfo
    })
}

// 请求获取注册验证码
export const reqGetCode = (phone) =>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
    })
}
// 根据token请求获取用户信息
export const reqGetUserInfo = () =>{
    return request({
        url:'/user/passport/auth/getUserInfo',
        method:'get',
    })
}
// 请求退出登录接口
export const reqLogout = () =>{
    return request({
        url:'/user/passport/logout',
        method:'get'
    })
}
// 请求获取用户地址信息
export const reqUserAddressList = () =>{
    return request({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}
// 请求获取订单交易页面
export const reqTradeInfo = () =>{
    return request({
        url:'/order/auth/trade',
        method:'get'
    })
}
// 请求提交订单
export const reqSubmitOrder = (tradeNo,tradeInfo) => {
    return request({
      url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
      method:'post',
      data:tradeInfo
    })
  }
  //请求获取支付信息
  export const reqPayInfo = (orderId) => {
    return request({
      url:`/payment/weixin/createNative/${orderId}`,
      method:'get'
    })
  }
  //返回订单支付状态
  export const reqPayStatus = (orderId) => {
    return request({
      url:`/payment/weixin/queryPayStatus/${orderId}`,
      method:'get'
    })
  }
  
  // //请求获取我的订单列表数据
  export const reqMyOrderInfo = (page,limit) => {
    return request({
      url:`/order/auth/${page}/${limit}`,
      method:'get'
    })
  }
  