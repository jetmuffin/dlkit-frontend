import defaultSettings from '@/defaultSettings';

const {dlkitDebug} = defaultSettings;

export function getAuthRequestHeader(){
    const token = localStorage.getItem('access_token');
    const reqHeader = {
      'Authorization': token
    }
    return dlkitDebug?{
        'Debug': 'true',
        'Debug-User': 'jchen'
      }:reqHeader
}