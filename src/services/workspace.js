import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';

export async function queryWorkspaces() {
  const userName = getAuthority();
  debugger
  return request('/apis/workspace',{
    method: 'GET',
    headers: {
      'User': 'jetmuffin'
    }
  });
}

export async function createWorkspace(params) {
  return request('/apis/workspace',{
    method: 'POST',
    headers: {
      'User': 'jetmuffin'
    },
    body: params
  });
}

export async function deleteWorkspace(params) {
  return request(`/apis/workspace/${params}`,{
    method: 'DELETE',
    headers: {
      'User': 'jetmuffin'
    }
  });
}

export async function putWorkspace(params) {
  return request(`/apis/workspace/${params}`,{
    method: 'PUT',
    headers: {
      'User': 'jetmuffin'
    }
  });
}