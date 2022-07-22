/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryUserList(params: Global.pageParams) {
  return request<Global.Result<User.UserEntity[]>>('/api/users', {
    method: 'get',
    params,
  });
}

export async function queryUser(params: Pick<User.UserEntity, 'id'>) {
  return request<Global.Result<User.UserEntity>>(`/api/users/${params?.id}`, {
    method: 'get',
  });
}

export async function addUser(data: User.UserEntity) {
  return request<Global.Result<User.UserEntity>>('/api/users', {
    method: 'post',
    data,
  });
}

export async function editUser(data: User.UserEntity) {
  const { id, ...restData } = data;
  return request<Global.Result<User.UserEntity>>(`/api/users/${id}`, {
    method: 'patch',
    data: restData,
  });
}

export async function delUser(data: Pick<User.UserEntity, 'id'>) {
  const { id } = data;
  return request<Global.Result<User.UserEntity>>(`/api/users/${id}`, {
    method: 'delete',
  });
}
