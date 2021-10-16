
const Home = () => import('@/pages/Home')//import函数可以让文件单独打包，并且动态加载
const Search = () => import('@/pages/Search')//import函数可以让文件单独打包，并且动态加载




// import Home from '@/pages/Home'

import Login from '@/pages/Login'
// import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import GroupOrder from '@/pages/Center/GroupOrder'
import Myorder from '@/pages/Center/MyOrder'
import Center from '@/pages/Center'


export default [
    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'/center/myorder',
                component:Myorder,
            },
            {
                path:'/center/groupOrder',
                component:GroupOrder,
            },
        ] 
    },
    {
        path:'/trade',
        component:Trade,
    },
    {
        path:'/pay',
        component:Pay,
    },
    {
        path:'/paySuccess',
        component:PaySuccess,
    },
    {
        path:'/shopcart',
        component:ShopCart,
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
    },
    {
        path:'/detail/:goodsId',
        component:Detail,
    },
    {
        path:'/home',
        component:Home,
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHidden:true
        }
    },
    {
        path:'/search/:keyword?',//?代表params参数可传可不传
        component:Search,
        name:'search'
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHidden:true
        }
    },
    {
        path:'/',
        redirect:'/home'
      },
] 