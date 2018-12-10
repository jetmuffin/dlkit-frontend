import {queryDatasets} from "@/services/dataset"
export default{
    namespace: "dataset",
    state: {
        list: [],
    },
    effects:{
        *queryDatasetList(_, sagaEffects) {
            const { call, put } = sagaEffects;
            const { datasets } = yield call(queryDatasets);
            yield put({ type: "updateList", payload: datasets });
        },
    },
    reducers: {
        updateList(state, { payload: datasets }){
            return {
                list: datasets,
            }
        }
    }
}