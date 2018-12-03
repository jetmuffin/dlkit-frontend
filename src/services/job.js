import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';

export async function queryJobs(params) {
    const token = localStorage.getItem('access_token');
    return request(`/apis/workspace/${params}`,{
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
}

export async function queryLogs(params) {
  const token = localStorage.getItem('access_token');
  return request(`/apis/log/${params}`,{
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
}