/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

export async function queryComponList() {
  return request<Global.Result<Compon.ComponEntity[]>>('/api/compon', {
    method: 'get',
  });
}

export async function addCompon(data: Compon.ComponEntity) {
  return request<Global.Result<Compon.ComponEntity>>('/api/compon', {
    method: 'post',
    data,
  });
}

export async function editCompon(data: Compon.ComponEntity) {
  const { id, ...restData } = data;
  return request<Global.Result<Compon.ComponEntity>>(`/api/compon/${id}`, {
    method: 'patch',
    data: restData,
  });
}

export async function delCompon(data: Pick<Compon.ComponEntity, 'id'>) {
  const { id } = data;
  return request<Global.Result<Compon.ComponEntity>>(`/api/compon/${id}`, {
    method: 'delete',
  });
}
