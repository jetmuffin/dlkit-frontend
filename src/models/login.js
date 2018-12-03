import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { loginWithLDAP } from '@/services/login';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },
  
  subscriptions: {
    setup({dispatch,history}){
      history.listen((path)=>{
        if(path.pathname==="/"&&path.query&&path.query.token){
          console.log(path.query.token);
          localStorage.setItem('access_token',path.query.token);
          dispatch(routerRedux.replace('/dashboard/workspace'));
        }
      })
    }
  },

  effects: {
    *loginWithLDAP({ payload },  { call, put, take }) {
      yield call(loginWithLDAP);
      debugger
    },
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      debugger
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
