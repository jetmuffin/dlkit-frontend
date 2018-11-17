import { queryWorkspaces, createWorkspace, deleteWorkspace, putWorkspace } from "@/services/workspace";
import key from 'keymaster';


export default{
    namespace: "workspace",
    state: {
        list: [],
    },
    effects: {
        *queryWorkspaceList(_, sagaEffects) {
            const { call, put } = sagaEffects;
            const { workspaces } = yield call(queryWorkspaces);
            yield put({ type: "updateList", payload: workspaces });
        },
        *createNewWorkspace({ payload }, sagaEffects) {
            const { call, put } = sagaEffects;
            const response = yield call(createWorkspace, payload);
            debugger
            const { workspaces } = yield call(queryWorkspaces);
            yield put({ type: "updateList", payload: workspaces });
        },
        *deleteWorkspace({ payload }, sagaEffects) {
            debugger
            const { call, put } = sagaEffects;
            yield call(deleteWorkspace, payload);
            const { workspaces } = yield call(queryWorkspaces);
            yield put({ type: "updateList", payload: workspaces });
        },
        *putWorkspace({ payload }, sagaEffects) {
            const { call, put } = sagaEffects;
            yield call(putWorkspace,payload);
            const { workspaces } = yield call(queryWorkspaces);
            yield put({ type: "updateList", payload: workspaces });
        },
    },
    subscriptions: {
        refresh({ dispatch }) {
            key('shift+z', ()=>{ dispatch({ type: "queryWorkspaceList" }) })
        }
    },
    reducers: {
        updateList(state, { payload: workspaces }){
            return {
                list: workspaces,
            }
        }
    }
}