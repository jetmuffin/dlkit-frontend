import request from '@/utils/request';

export async function loginWithGithub(url) {
  window.location.href = url;
}

export async function getCookie(){
  return request('/oauth/access_token')
}