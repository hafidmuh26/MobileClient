import {
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    FIND_ITEMS_REQUEST,
    FIND_ITEMS_SUCCESS,
    FIND_ITEMS_FAILURE,

    FIND_ITEM_REQUEST,
    FIND_ITEM_SUCCESS,
    FIND_ITEM_FAILURE,

    SAVE_ITEM_REQUEST,
    SAVE_ITEM_SUCCESS,
    SAVE_ITEM_FAILURE,

} from '../actions/constants';
import { commonAxios } from '../util/ApiUtil';
import { takeLatest, put } from 'redux-saga/effects';

function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('items', {
            params: { ...search, sort, page, size }
        });
        
        yield put({
            type: FIND_ITEMS_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_ITEMS_FAILURE,
            error: error
        });
    }
}

function* save(action) {
    const {id, name} = action.data;
    try {
      const data = yield (id ?
      commonAxios.put(`items/${id}`, {id, name}) : 
      commonAxios.post('items', {name}))
        
        yield put({
            type: SAVE_ITEM_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: SAVE_ITEM_FAILURE,
            error: error
        });
    }
}

function* deleteById(action) {
    try {
      const data = yield commonAxios.delete(`items/${action.id}`);

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

function* findItemById(action) {
    try {
      const data = yield commonAxios.get(`items/${action.id}`);

        yield put({
            type: FIND_ITEM_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_ITEM_FAILURE,
            error: error
        });
    }
}


export function* watchFindsItems() {
    yield takeLatest(FIND_ITEMS_REQUEST, findAll);
}

export function* watchSaveItem() {
    yield takeLatest(SAVE_ITEM_REQUEST, save);
}

export function* watchDeleteItemById() {
    yield takeLatest(DELETE_REQUEST, deleteById);
}

export function* watchFindItemById() {
    yield takeLatest(FIND_ITEM_REQUEST, findItemById);
}



