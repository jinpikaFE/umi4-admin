// {
//   path: '/welcome',
//   component: 'IndexPage',
//   name: '欢迎', // 兼容此写法
//   icon: 'testicon',
//   // 更多功能查看
//   // https://beta-pro.ant.design/docs/advanced-menu
//   // ---
//   // 新页面打开
//   target: '_blank',
//   // 不展示顶栏
//   headerRender: false,
//   // 不展示页脚
//   footerRender: false,
//   // 不展示菜单
//   menuRender: false,
//   // 不展示菜单顶栏
//   menuHeaderRender: false,
//   // 权限配置，需要与 plugin-access 插件配合使用
//   access: 'canRead',
//   // 隐藏子菜单
//   hideChildrenInMenu: true,
//   // 隐藏自己和子菜单
//   hideInMenu: true,
//   // 在面包屑中隐藏
//   hideInBreadcrumb: true,
//   // 子项往上提，仍旧展示,
//   flatMenu: true,

import { AUTH_ITEM_ENUM } from '../src/common/authList';

// },
export default [
  {
    path: '/',
    redirect: '/home',
  },
  { path: '/login', layout: false, component: './Login' },
  {
    name: '首页',
    title: AUTH_ITEM_ENUM.HOME,
    access: 'normalRouteFilter',
    path: '/home',
    icon: 'home',
    component: './Home',
  },
  {
    name: '权限管理',
    path: '/accessManage',
    title: AUTH_ITEM_ENUM.AUTH,
    access: 'normalRouteFilter',
    icon: 'setting',
    routes: [
      {
        name: '组件管理',
        title: AUTH_ITEM_ENUM.AUTH_COMPON,
        access: 'normalRouteFilter',
        icon: 'team',
        path: '/accessManage/componManage',
        component: './accessManage/ComponManage',
      },
      {
        name: '角色管理',
        title: AUTH_ITEM_ENUM.AUTH_ROLE,
        access: 'normalRouteFilter',
        icon: 'team',
        path: '/accessManage/roleManage',
        component: './accessManage/RoleManage',
      },
      {
        name: '用户管理',
        title: AUTH_ITEM_ENUM.AUTH_ACCOUNT,
        access: 'normalRouteFilter',
        icon: 'team',
        path: '/accessManage/userManage',
        component: './accessManage/AccountManage',
      },
    ],
  },
  {
    name: 'CRUD 示例',
    title: AUTH_ITEM_ENUM.CRUD,
    access: 'normalRouteFilter',
    icon: 'team',
    path: '/table',
    component: './Table',
  },
];
