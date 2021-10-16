import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as API from '@/api'
import { Button,MessageBox,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "@/mock/index" //引入mock，让接口生效
import "swiper/css/swiper.css"//后期有其他地方需要用到，可以无需再引入

// import '@/api'
// 全局注册
import Typenav from '@/components/Typenav'
import Pagination from '@/components/Pagination'


Vue.component(Typenav.name,Typenav),
Vue.component('Pagination',Pagination),


Vue.config.productionTip = false
// 按需引入
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert;



new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线
    Vue.prototype.$API = API
  },
  render: h => h(App),
   router,
   store
}).$mount('#app')
// new Vue({
//     el:'#app',
//     render: h => h(App),
//     router //所有组件内部都可以使用this.$router和this.$route
//  })