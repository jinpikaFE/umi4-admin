// 运行时配置
import { AxiosResponse, history, Link, RequestConfig } from '@umijs/max';
import { Button, message, notification } from 'antd';
import NotFound from './components/NotFound';
import RightContent from './components/RightContent';
import { queryUser } from './services/assessManage/user/UserController';
import { storage } from './utils/Storage';

export type InitialStateType = {
  currentUser?: User.UserEntity;
  authArr?: string[];
  loading?: boolean;
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialStateType> {
  if (storage.get('userInfo')) {
    const resUser = await queryUser({ id: storage.get('userInfo')?.id });
    const currentUser = resUser?.data;
    const authArr =
      currentUser?.role?.map((item) => item?.compon).flat(Infinity) || [];

    const newAuthArr = authArr?.map((item: Compon.ComponEntity) => {
      if (item?.name?.includes('half')) {
        return item?.name?.substring(0, item?.name.length - 5);
      }
      return item?.name;
    });

    if (currentUser) {
      return {
        currentUser,
        authArr: newAuthArr,
      };
    }

    return { currentUser: { username: '@umijs/max' } };
  }
  return { currentUser: undefined };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    layout: 'mix',
    rightContentRender: () => <RightContent />,
    // 自定义 403 页面
    unAccessible: (
      <NotFound
        status="403"
        title="403"
        subTitle="对不起！暂无该页面访问权限！请联系管理员或更换账号登录"
        extra={
          <>
            <Button type="primary">
              <Link to="/login">重新登录</Link>
            </Button>
          </>
        }
      />
    ),
    menu: {
      locale: false,
    },
  };
};

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */
const errorHandler = (error: {
  response: Response & { data?: any };
}): Response => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if (response?.data) {
      notification.error({
        message: `Request error ${status}: ${response?.data?.path}`,
        description: `${response?.data?.message} ${response?.data?.error} ${errorText}`,
      });
      if (status === 401) {
        storage.clear();
        history.replace('/login');
      }
      return response;
    }

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '请求服务器错误',
      message: 'Network anomaly',
    });
  }
  return response;
};

const responseInterceptors = (response: AxiosResponse) => {
  if (response?.data?.code === 200) {
    return response;
  }
  message.error(response?.data?.message || '系统错误');
  return response;
};

const requestInterceptors = (response: AxiosResponse) => {
  const token = storage.get('token');
  if (token) response.headers.Authorization = `Bearer ${token}`;
  return response;
};

export const request: RequestConfig = {
  timeout: 1000,
  requestInterceptors: [requestInterceptors],
  responseInterceptors: [responseInterceptors],
  errorConfig: {
    errorHandler,
  },
};
