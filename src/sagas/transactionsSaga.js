import {
    FIND_TRANSACTIONS_REQUEST,
    FIND_TRANSACTIONS_SUCCESS,
    FIND_TRANSACTIONS_FAILURE,
    
    FIND_TRANSACTION_REQUEST,
    FIND_TRANSACTION_SUCCESS,
    FIND_TRANSACTION_FAILURE,

    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    SAVE_TRANSACTION_REQUEST,
    SAVE_TRANSACTION_SUCCESS,
    SAVE_TRANSACTION_FAILURE,

    SUMMARY_TRANSACTION_REQUEST,
    SUMMARY_TRANSACTION_SUCCESS,
    SUMMARY_TRANSACTION_FAILURE,

} from '../actions/constants';
import { commonAxios } from '../util/ApiUtil';
import { takeLatest, put } from 'redux-saga/effects';

function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('transactions', {
            params: { ...search, sort, page, size }
        });
        
        yield put({
            type: FIND_TRANSACTIONS_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_TRANSACTIONS_FAILURE,
            error: error
        });
    }
}

function* save(action) {
    const { id, amount, type, description } = action.data
    try {
      const data = yield (id ?
        commonAxios.put(`transactions/${id}`, { id, amount, type, description }) : 
        commonAxios.post('transactions', { 'amount':amount, 'type':type, 'description':description }));

        yield put({
            type: SAVE_TRANSACTION_SUCCESS,
            data: data
            
        });
    } catch (error) {
        yield put({
            type: SAVE_TRANSACTION_FAILURE,
            error: error
        });
    }
}

function* deleteById(action) {
    try {
      const data = yield commonAxios.delete(`transactions/${action.id}`);

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
      const data = yield commonAxios.get(`transactions/${action.id}`);

        yield put({
            type: FIND_TRANSACTION_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_TRANSACTION_FAILURE,
            error: error
        });
    }
}


function* summary(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('transactions/summary', {
            params: { ...search, sort, page, size }
        });
        
        yield put({
            type: SUMMARY_TRANSACTION_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: SUMMARY_TRANSACTION_FAILURE,
            error: error
        });
    }
}


export function* watchFindsTransaction() {
    yield takeLatest(FIND_TRANSACTIONS_REQUEST, findAll);
}

export function* watchSaveTransaction() {
    yield takeLatest(SAVE_TRANSACTION_REQUEST, save);
}

export function* watchDeleteTransactionById() {
    yield takeLatest(DELETE_REQUEST, deleteById);
}

export function* watchFindTransactionById() {
    yield takeLatest(FIND_TRANSACTION_REQUEST, findById);
}

export function* watchTransactionSummary() {
    yield takeLatest(SUMMARY_TRANSACTION_REQUEST, summary);
}



