import request from '@/utils/request';

export async function queryJobs(params) {
    return request(`/apis/workspace/${params}`,{
      method: 'GET',
      headers: {
        'User': 'jetmuffin'
      }
    });
}

export async function queryLogs(params) {
  return request(`apis/log/${params}`,{
    method: 'GET',
    headers: {
      'User': 'jetmuffin'
    }
  })
}