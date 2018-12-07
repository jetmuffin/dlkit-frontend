import request from '@/utils/request';

export async function loginWithLDAP() {
  window.location.href = 'http://114.212.189.147:10167/auth?client_id=dlkit&redirect_uri=http://dlkit.njuics.cn/oauth/callback&response_type=code&scope=openid+profile+email+offline_access';
  // window.location.href = 'http://114.212.189.147:10167/auth?client_id=dlkit-localhost&redirect_uri=http://localhost:8000/oauth/callback&response_type=code&scope=openid+profile+email+offline_access'
  // return request('/login');
}

export async function exchangeForAccess_token(params) {
  const formData = new FormData()
  formData.append('client_id','dlkit-localhost')
  formData.append('client_secret','dxprxwKUpQzvMc6H')
  formData.append('redirect_uri','http://localhost:8000/oauth/callback')
  formData.append('grant_type','authorization_code')
  formData.append('code',params)
  return request('/token',{
    method: 'POST',
    body: formData
  })
}