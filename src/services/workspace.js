import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';

export async function queryWorkspaces() {
  const userName = getAuthority();
  debugger
  return request('/apis/workspace',{
    method: 'GET',
    headers: {
      'User': 'test'
    }
  });
}

export async function createWorkspace(params) {
  return request('http://dlkit.njuics.cn/apis/workspace',{
    method: 'POST',
    body: params
  });
}

export async function deleteWorkspace(params) {
  return request(`http://dlkit.njuics.cn/apis/workspace/${params}`,{
    method: 'DELETE',
  });
}

export async function putWorkspace(params) {
  return request(`http://dlkit.njuics.cn/apis/workspace/${params}`,{
    method: 'PUT',
  });
}