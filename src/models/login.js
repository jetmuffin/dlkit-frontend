import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { loginWithLDAP, exchangeForAccess_token } from '@/services/login';
import defaultSettings from '@/defaultSettings';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },
  
  subscriptions: {
    setup({dispatch,history}){
      history.listen((path)=>{
        if(path.pathname=="/oauth/callback"&&path.query&&path.query.code){
          dispatch({
            type: 'exchangeForAccess_token',
            payload:path.query.code
          })
        }
        if(path.pathname==="/"&&path.query&&path.query.access_token){
          console.log(path.query.access_token);
          localStorage.setItem('access_token',path.query.access_token);
          dispatch(routerRedux.replace('/dashboard/workspace'));
        }
      })
    }
  },

  effects: {
    *exchangeForAccess_token({payload},{call,put}){
      const response = yield call(exchangeForAccess_token,payload);
      yield put(routerRedux.replace(`/?access_token=${response.id_token}`))
    },
    *loginWithLDAP({ payload },  { call, put, take }) {
      const {dlkitDebug} = defaultSettings
      if(dlkitDebug===true){
        yield put(routerRedux.replace('/dashboard/workspace'));
      }
      else{
        yield call(loginWithLDAP);
      }
    },
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.replace('/dashboard/workspace'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
