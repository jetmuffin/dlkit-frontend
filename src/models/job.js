import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { queryJobs, queryLogs } from '../services/job';

export default {
  namespace: 'job',

  state: {
    log: [],
    list: [],
    workspace: "",
  },

  effects: {
    *fetchLog({ payload }, { call,put }){
      const response = yield call(queryLogs,payload);
      const { log } = response;
      yield put({
        type: 'queryLog',
        payload: Array.isArray(log) ? log : []
      })
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryJobs, payload);
      const { jobStatuses } = response;
      debugger
      yield put({
        type: 'queryList',
        payload: Array.isArray(jobStatuses) ? jobStatuses : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    setWorkspace(state, action){
        return {
            ...state,
            workspace: action.payload
        }
    },
    queryLog(state,action) {
      return {
        ...state,
        log: action.payload
      }
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
