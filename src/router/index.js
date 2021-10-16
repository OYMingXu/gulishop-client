// 引入声明插件
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes';
import store from '@/store'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
    routes,
    //配置滚动行为，跳转到新的路由界面滚动条的位置
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
  // 配置登录全局守卫
  router.beforeEach(async(to, from, next) => {
    let token =store.state.user.token
    let userInfo = store.state.user.userInfo.name

    if (token) {
      if(to.path === '/login'){
        // 用户已经登录过了
        next('/')
      }else{
        if (userInfo) {
          next()
        }else{
          // 用户已经登录，但是没有获取用户信息
          try {
            await store.dispatch('getUserInfo')
            next()
          } catch (error) {
            // 根据token获取用户信息失败
            // 清除过期的token
            store.dispatch('userLogout')
            next('/login')
          }
        }


      }
    }else{
      //用户根本没登录，
      //目前我们什么都不做，直接放行，后面我们是需要添加功能的
      //如果用户访问的是 交易相关  支付相关 个人中心相关，那么跳转到登录页面
      next()
      // let targetPath = to.path
      // if(targetPath.indexOf('/trade')!==-1 || targetPath.indexOf('/pay')!==-1 || targetPath.startsWith('/center')){
      //   // next('/login') 这样写可以直接去到登录页，但是登录成功不会去到之前想去的地方
      //   next('/login?redirect='+targetPath) //想要回到之前想去的地方，必须把想去的那个路径给带到登录里面  
      // }else{
      //   next()
      // }
      
    }




  })


// 暴露一个路由器对象
export default router
