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
  return request('/apis/workspace',{
    method: 'POST',
    headers: {
      'User': 'test'
    },
    body: params
  });
}

export async function deleteWorkspace(params) {
  return request(`/apis/workspace/${params}`,{
    method: 'DELETE',
    headers: {
      'User': 'test'
    }
  });
}

export async function putWorkspace(params) {
  return request(`/apis/workspace/${params}`,{
    method: 'PUT',
    headers: {
      'User': 'test'
    }
  });
}