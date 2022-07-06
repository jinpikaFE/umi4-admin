// import { PageLoading } from '@ant-design/pro-layout'
// import { history } from 'umi'
// import type { RunTimeLayoutConfig } from 'umi'
// import { notification } from 'antd'
// import xslogo from '@/assets/xslogo.png'
// import { getUserDetail } from './api'
// import HeardRightContent from './components/heardRightContent'
// import { storage } from './utils/Storage'

// /** 获取用户信息比较慢的时候会展示一个 loading */
// export const initialStateConfig = {
//   loading: <PageLoading />,
// }

// export async function getInitialState() {
//   let data = {}
//   if (history?.location?.pathname !== '/login') {
//     if (storage.get('user_id')) {
//       const res = await getUserDetail({ userid: storage.get('user_id') })
//       data = res?.data
//       if (!res?.data?.is_staff) {
//         notification.error({
//           message: 'token过期或未登录或没有权限',
//           description: '请重新登录或寻找管理员添加权限',
//         })
//         setTimeout(() => {
//           history.push('/login')
//         }, 500)
//       }
//     } else {
//       notification.error({
//         message: 'token过期或未登录或没有权限',
//         description: '请重新登录或寻找管理员添加权限',
//       })
//       setTimeout(() => {
//         history.push('/login')
//       }, 500)
//     }
//   }

//   const user = {
//     is_staff: false,
//     ...data,
//   }
//   return user
// }

// // ProLayout 支持的api https://procomponents.ant.design/components/layout
// export const layout: RunTimeLayoutConfig = () => {
//   return {
//     rightContentRender: () => <HeardRightContent />,
//     // logo:xslogo,
//     disableContentMargin: false,
//     menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <div>unAccessible</div>,
//     // 增加一个 loading 的状态
//     childrenRender: (children, props) => {
//       // if (initialState?.loading) return <PageLoading />;
//       return <>{children}</>
//     },
//   }
// }
