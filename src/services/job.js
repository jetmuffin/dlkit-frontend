import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';
import defaultSettings from '@/defaultSettings';
import { getAuthRequestHeader } from '@/utils/DlkitDebug';

const {dlkitDebug} = defaultSettings;

export async function queryJobs(params) {
    return request(`/apis/workspace/${params}`,{
      method: 'GET',
      headers: getAuthRequestHeader()
    });
}

export async function queryLogs(params) {
  return request(`/apis/log/${params}`,{
    method: 'GET',
    headers: getAuthRequestHeader()
  })
}