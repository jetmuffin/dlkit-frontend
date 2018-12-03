import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';

export async function queryWorkspaces() {
  const token = localStorage.getItem('access_token');
  return request('/apis/workspace',{
    method: 'GET',
    // headers: {
    //   'User': userName[0]
    // }
    headers: {
      'Authorization': token
    }
  });
}

export async function createWorkspace(params) {
  const token = localStorage.getItem('access_token');
  return request('/apis/workspace',{
    method: 'POST',
    // headers: {
    //   'User': userName[0]
    // },
    headers: {
      'Authorization': token
    },
    body: params
  });
}

export async function deleteWorkspace(params) {
  const token = localStorage.getItem('access_token');
  return request(`/apis/workspace/${params}`,{
    method: 'DELETE',
    // headers: {
    //   'User': userName[0]
    // }
    headers: {
      'Authorization': token
    }
  });
}

export async function putWorkspace(params) {
  const token = localStorage.getItem('access_token');
  return request(`/apis/workspace/${params}`,{
    method: 'PUT',
    // headers: {
    //   'User': userName[0]
    // }
    headers: {
      'Authorization': token
    }
  });
}