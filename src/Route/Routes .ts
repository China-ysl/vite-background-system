//页面别名配置
import LayoutView from '../components/layout/index.vue'
import HomeView from '../Views/Home/index.vue'
import LinkView from '../Views/Link/index.vue'
import LoginView from '../Views/Login/index.vue'
import MusicView from '../Views/Music/index.vue'
import Views404 from '../Views/404/index.vue'
import ScreenView from '../Views/Screen/index.vue'
import MenuManagementView from '../Views/Permissions/MenuManagement/index.vue'
import RoleManagementView from '../Views/Permissions/RoleManagement/index.vue'
import UserManagementView from '../Views/Permissions/UserManagement/index.vue'
import BrandView from '../Views/Shopping/Brand/index.vue'
import AttrView from '../Views/Shopping/Attr/index.vue'
import SpuView from '../Views/Shopping/Spu/index.vue'
import SkuView from '../Views/Shopping/Sku/index.vue'
// 引入路由仓库
import useRouteStore from '../store/modules/route'
let routeStore = useRouteStore()
// 对外暴露配置路由
//hidden 是否隐藏true  false
export const contstantRoutes = [
  {
    //Home
    path: '/',
    name: 'home',
    meta: {
      title: '',
      icon: 'HomeFilled',
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
        component: () => HomeView,
      },
    ],
    component: () => LayoutView,
  },
  {
    //数据大屏
    path: '/screen',
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'Monitor',
      hidden: false,
    },
    component: () => ScreenView,
  },
  {
    //权限管理
    path: '/Permissions',
    name: 'Permissions',
    meta: {
      title: '权限管理',
      icon: 'Lock',
      hidden: false,
    },
    children: [
      {
        path: '/Permissions/UserManagement',
        name: 'UserManagement',
        meta: {
          title: '用户管理',
          icon: 'User',
          hidden: false,
        },
        component: () => UserManagementView,
      },
      {
        path: '/Permissions/RoleManagement',
        name: 'RoleManagement',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
          hidden: false,
        },
        component: () => RoleManagementView,
      },
      {
        path: '/Permissions/MenuManagement',
        name: 'MenuManagement',
        meta: {
          title: '菜单管理',
          icon: 'MoreFilled',
          hidden: false,
        },
        component: () => MenuManagementView,
      },
    ],
    component: () => LayoutView,
  },
  {
    //商品管理
    path: '/Shopping',
    name: 'Shopping',
    meta: {
      title: '商品管理',
      icon: 'ShoppingCartFull',
      hidden: false,
    },
    children: [
      {
        path: '/Shopping/Brand',
        name: 'Brand',
        meta: {
          title: '品牌管理',
          icon: 'Goods',
          hidden: false,
        },
        component: () => BrandView,
      },
      {
        path: '/Shopping/Attr',
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'Fold',
          hidden: false,
        },
        component: () => AttrView,
      },
      {
        path: '/Shopping/spu',
        name: 'spu',
        meta: {
          title: 'spu管理',
          icon: 'Box',
          hidden: false,
        },
        component: () => SpuView,
      },
      {
        path: '/Shopping/sku',
        name: 'sku',
        meta: {
          title: 'sku管理',
          icon: 'PriceTag',
          hidden: false,
        },
        component: () => SkuView,
      },
    ],
    component: () => LayoutView,
  },
  {
    //登录
    path: '/Login',
    name: 'Login',
    meta: {
      title: '登录',
      icon: 'Avatar',
      hidden: true,
    },
    component: () => LoginView,
  },
  {
    //链接
    path: '/Link',
    name: 'Link',
    meta: {
      title: '友链',
      hidden: true,
    },
    component: () => LinkView,
  },
  {
    //音乐
    path: '/Music',
    name: 'Music',
    meta: {
      title: '音乐',
      hidden: true,
    },
    component: () => MusicView,
  },
  {
    //404
    path: '/404',
    name: 'Views404',
    meta: {
      title: '4041',
      hidden: true,
    },
    component: () => Views404,
  },
  {
    // 所有路径
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: {
      title: '出错页1',
      hidden: true,
    },
  },
]
