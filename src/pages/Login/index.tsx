import { sendSms } from '@/global/api';
import { queryUser } from '@/services/assessManage/user/UserController';
import services from '@/services/login';
import { storage } from '@/utils/Storage';
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoOutlined,
  UserOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Button, Divider, message, Space, Tabs } from 'antd';
import type { CSSProperties, FC } from 'react';
import { useState } from 'react';
import routers from '../../../config/routes';

const { login } = services.LoginController;

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const Login: FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const { refresh } = useModel('@@initialState');

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: 'calc(100vh - 48px)',
        margin: -24,
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="jin pi ka"
        subTitle="网站"
        onFinish={async (values: any) => {
          const res = await login({ ...values, loginType });

          if (res.code === 200) {
            storage.set('token', res?.data?.token);
            const resUser = await queryUser({ id: res?.data?.userId });
            if (resUser?.code === 200) {
              storage.set('userInfo', resUser?.data);
              message.success(res.message || '登录成功');
              // history.push('/home');
              const currentUser = resUser?.data;
              const authArr =
                currentUser?.role?.map((item) => item?.compon).flat(Infinity) ||
                [];

              const newAuthArr = authArr?.map((item: Compon.ComponEntity) => {
                if (item?.name?.includes('half')) {
                  return item?.name?.substring(0, item?.name.length - 5);
                }
                return item?.name;
              });
              /** 登录进入有权限的页面处理 */
              const relAuthArr = Array.from(new Set(newAuthArr));
              let auhtPath: string = '/';
              const relRoute: any[] = [];
              const flatRoute = (data: typeof routers) => {
                data?.forEach?.((item) => {
                  relRoute.push(item);
                  if (item?.routes) {
                    relRoute.push(item?.routes);
                  }
                });
              };
              flatRoute(routers);
              const getRouteIndex = (authArrParams: any[]) =>
                relRoute
                  .flat(Infinity)
                  ?.findIndex((item) => item?.title === authArrParams?.[0]);
              const routeIndex = getRouteIndex(relAuthArr);
              if (relRoute.flat(Infinity)?.[routeIndex]?.routes) {
                const indexArr = relAuthArr?.filter((item) => {
                  return (
                    relRoute
                      .flat(Infinity)
                      ?.[routeIndex]?.routes?.findIndex(
                        (citem: { title: string }) => citem?.title === item,
                      ) !== -1
                  );
                });
                auhtPath =
                  relRoute.flat(Infinity)?.[getRouteIndex(indexArr)]?.path;
              } else {
                auhtPath = relRoute.flat(Infinity)?.[routeIndex]?.path;
              }
              if ((currentUser?.role || [])?.length === 0) {
                auhtPath = '/';
              }
              history.push(auhtPath);
              refresh();
              window?.location.reload();
            }
          }
        }}
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: '#fff',
            borderRadius: 8,
            backgroundColor: '#1677FF',
          },
          title: '中后台管理系统',
          subTitle: '活动介绍说明文字',
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: '#fff',
                color: '#1677FF',
                width: 120,
              }}
            >
              去看看
            </Button>
          ),
        }}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
              >
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: 40,
                  width: 40,
                  border: '1px solid #D4D8DD',
                  borderRadius: '50%',
                }}
              >
                <WeiboOutlined style={{ ...iconStyles, color: '#333333' }} />
              </div>
            </Space>
          </div>
        }
      >
        <Tabs
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: admin'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="username"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              phoneName="username"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async (phone) => {
                const res = await sendSms({ phone });
                if (res?.code === 200) {
                  message.success('获取短信验证码成功');
                }
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
