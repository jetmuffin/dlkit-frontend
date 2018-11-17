import request from '@/utils/request';

export async function queryWorkspaces() {
  return request('http://dlkit.njuics.cn/apis/workspace',{
    method: 'GET',
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