import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';

export async function queryWorkspaces() {
  const userName = getAuthority();
  return request('/apis/workspace',{
    method: 'GET',
    // headers: {
    //   'User': userName[0]
    // }
    headers: {
      'User': 'test'
    }
  });
}

export async function createWorkspace(params) {
  // const userName = getAuthority();
  return request('/apis/workspace',{
    method: 'POST',
    // headers: {
    //   'User': userName[0]
    // },
    headers: {
      'User': 'test'
    },
    body: params
  });
}

export async function deleteWorkspace(params) {
  // const userName = getAuthority();
  return request(`/apis/workspace/${params}`,{
    method: 'DELETE',
    // headers: {
    //   'User': userName[0]
    // }
    headers: {
      'User': 'test'
    }
  });
}

export async function putWorkspace(params) {
  // const userName = getAuthority();
  return request(`/apis/workspace/${params}`,{
    method: 'PUT',
    // headers: {
    //   'User': userName[0]
    // }
    headers: {
      'User': 'test'
    }
  });
}