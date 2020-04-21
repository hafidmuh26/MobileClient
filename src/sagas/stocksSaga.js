import {
    FIND_STOCKS_REQUEST,
    FIND_STOCKS_SUCCESS,
    FIND_STOCKS_FAILURE,

    FIND_STOCK_REQUEST,
    FIND_STOCK_SUCCESS,
    FIND_STOCK_FAILURE,

    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    SAVE_STOCK_REQUEST,
    SAVE_STOCK_SUCCESS,
    SAVE_STOCK_FAILURE,

    SUMMARY_STOCK_REQUEST,
    SUMMARY_STOCK_SUCCESS,
    SUMMARY_STOCK_FAILURE,

} from '../actions/constants';
import { commonAxios } from '../util/ApiUtil';
import { takeLatest, put } from 'redux-saga/effects';

function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('stocks', {
            params: { ...search, sort, page, size }
        });
        
        yield put({
            type: FIND_STOCKS_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_STOCKS_FAILURE,
            error: error
        });
    }
}

function* save(action) {
    const {id, item, quantity, unit} = action.data;
    try {
      const data = yield (action.id ?
      commonAxios.put(`stocks/${action.id}`, {"itemId": item?.id, "quantity": quantity, "unitId": unit?.id}) : 
      commonAxios.post('stocks', {"itemId": item?.id, "quantity": quantity, "unitId":unit?.id}))
        
        yield put({
            type: SAVE_STOCK_SUCCESS,
            data: data
            
        });
    } catch (error) {
        yield put({
            type: SAVE_STOCK_FAILURE,
            error: error
        });
    }
}

function* deleteById(action) {
    try {
      const data = yield commonAxios.delete(`stocks/${action.id}`);

        yield put({
            type: DELETE_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: DELETE_FAILURE,
            error: error
        });
    }
}

function* findById(action) {
    try {
      const data = yield commonAxios.get(`stocks/${action.id}`);

        yield put({
            type: FIND_STOCK_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_STOCK_FAILURE,
            error: error
        });
    }
}

function* summary() {
    try {
        const data = yield commonAxios.get('stocks/summary');
        yield put({
            type: SUMMARY_STOCK_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: SUMMARY_STOCK_FAILURE,
            error: error
        });
    }
}


export function* watchFindsStocks() {
    yield takeLatest(FIND_STOCKS_REQUEST, findAll);
}

export function* watchSaveStock() {
    yield takeLatest(SAVE_STOCK_REQUEST, save);
}

export function* watchDeleteStockById() {
    yield takeLatest(DELETE_REQUEST, deleteById);
}

export function* watchFindStockById() {
    yield takeLatest(FIND_STOCK_REQUEST, findById);
}

export function* watchStockSummary() {
    yield takeLatest(SUMMARY_STOCK_REQUEST, summary);
}



