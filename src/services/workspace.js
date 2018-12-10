import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';
import defaultSettings from '@/defaultSettings';
import { getAuthRequestHeader } from '@/utils/DlkitDebug';

const {dlkitDebug} = defaultSettings;

export async function queryWorkspaces() {
  const reqHeader = getAuthRequestHeader()
  return request('/apis/workspace',{
    method: 'GET',
    headers: reqHeader
  });
}

export async function createWorkspace(params) {
  return request('/apis/workspace',{
    method: 'POST',
    // headers: {
    //   'User': userName[0]
    // },
    headers: getAuthRequestHeader(),
    body: params
  });
}

export async function deleteWorkspace(params) {
  return request(`/apis/workspace/${params}`,{
    method: 'DELETE',
    // headers: {
    //   'User': userName[0]
    // }
    headers: getAuthRequestHeader()
  });
}

export async function putWorkspace(params) {
  return request(`/apis/workspace/${params}`,{
    method: 'PUT',
    // headers: {
    //   'User': userName[0]
    // }
    headers: getAuthRequestHeader()
  });
}