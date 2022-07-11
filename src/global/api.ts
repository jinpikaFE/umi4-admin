import { request } from '@umijs/max';

export async function uploadFile(data: any) {
  return request<Global.Result>('/api/upload', {
    method: 'POST',
    data,
  });
}

export async function sendSms(data: { phone: string }) {
  return request<Global.Result>('/api/sms', {
    method: 'POST',
    data,
  });
}
