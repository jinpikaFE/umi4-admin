/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryRoleList(params: Global.pageParams) {
  return request<Global.Result<Role.RoleEntity[]>>('/api/roles', {
    method: 'get',
    params
  });
}

export async function addRole(data: Role.RoleEntity) {
  return request<Global.Result<Role.RoleEntity>>('/api/roles', {
    method: 'post',
    data,
  });
}

export async function editRole(data: Role.RoleEntity) {
  const { id, ...restData } = data;
  return request<Global.Result<Role.RoleEntity>>(`/api/roles/${id}`, {
    method: 'patch',
    data: restData,
  });
}

export async function delRole(data: Pick<Role.RoleEntity, 'id'>) {
  const { id } = data;
  return request<Global.Result<Role.RoleEntity>>(`/api/roles/${id}`, {
    method: 'delete',
  });
}
