import request from '@/utils/request';
import { getAuthority } from '@/utils/authority';

export async function queryJobs(params) {
    // const userName = getAuthority();
    // debugger
    return request(`/apis/workspace/${params}`,{
      method: 'GET',
      // headers: {
      //   'User': userName[0]
      // }
      headers: {
        'User': 'test'
      }
    });
}

export async function queryLogs(params) {
  // const userName = getAuthority();
  return request(`/apis/log/${params}`,{
    method: 'GET',
    // headers: {
    //   'User': userName[0]
    // }
    headers: {
      'User': 'test'
    }
  })
}