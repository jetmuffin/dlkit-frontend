import request from '@/utils/request';

export async function loginWithLDAP() {
  window.location.href = 'http://114.212.189.147:10167/auth?client_id=dlkit&redirect_uri=http://dlkit.njuics.cn/oauth/callback&response_type=code&scope=openid+profile+email+offline_access';

  // return request('/login');
}