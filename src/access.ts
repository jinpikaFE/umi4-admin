import { InitialStateType } from './app';

export default (initialState: InitialStateType) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
  const { currentUser, authArr } = initialState;

  console.log(authArr);

  return {
    normalRouteFilter: (route: { title: string }) => {
      if (currentUser?.role?.[0]?.is_super) return true;
      if (authArr?.includes(route.title)) {
        return true;
      }
      return false;
    },
  };
};
