import request from '@/utils/request';
import { getAuthRequestHeader } from '@/utils/DlkitDebug';


export async function queryDatasets() {
  const reqHeader = getAuthRequestHeader()
  return request('/apis/dataset',{
    method: 'GET',
    headers: reqHeader
  });
}