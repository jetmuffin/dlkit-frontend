import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { loginWithGithub, getCookie } from '@/services/login';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    clientId: "837fdc3e941ffc687d3d",
    clientSecret: "5862a739b27a782081ceb452d9a236b2a45b6ac2",
    code: ""
  },

  effects: {
    *loginWithGithub({ payload },  { call, put, take }) {
      const path = "https://github.com/login/oauth/authorize" + '?client_id=' + payload;
      const [,response] = yield [call(loginWithGithub,path),take(getCookie)];
      debugger
    },
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        yield put(routerRedux.push('/dashboard/workspace'));
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
