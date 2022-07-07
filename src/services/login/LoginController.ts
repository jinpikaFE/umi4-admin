/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function login(data: Login.LoginEntity) {
  return request<Login.Result_Login>('/api/login', {
    method: 'POST',
    data,
  });
}
