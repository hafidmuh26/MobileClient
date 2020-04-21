import {
    FIND_UNITS_REQUEST,
    FIND_UNITS_SUCCESS,
    FIND_UNITS_FAILURE,

    FIND_UNIT_REQUEST,
    FIND_UNIT_SUCCESS,
    FIND_UNIT_FAILURE,

    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    SAVE_UNIT_REQUEST,
    SAVE_UNIT_SUCCESS,
    SAVE_UNIT_FAILURE,

} from '../actions/constants';
import { commonAxios } from '../util/ApiUtil';
import { takeLatest, put } from 'redux-saga/effects';

function* findAll(action) {
    const { search, sort = 'asc', page = 0, size = 10 } = action.params || {};
    try {
        const data = yield commonAxios.get('units', {
            params: { ...search, sort, page, size }
        });
        
        yield put({
            type: FIND_UNITS_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_UNITS_FAILURE,
            error: error
        });
    }
}

function* save(action) {
    const {id, name, description} = action.data;
    try {
      const data = yield (id ?
      commonAxios.put(`units/${id}`, {id, name, description}) : 
      commonAxios.post('units', {name, description}))
        
        yield put({
            type: SAVE_UNIT_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: SAVE_UNIT_FAILURE,
            error: error
        });
    }
}

function* deleteById(action) {
    try {
      const data = yield commonAxios.delete(`units/${action.id}`);

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

function* findUnitById(action) {
    try {
      const data = yield commonAxios.get(`units/${action.id}`);

        yield put({
            type: FIND_UNIT_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: FIND_UNIT_FAILURE,
            error: error
        });
    }
}


export function* watchFindsUnits() {
    yield takeLatest(FIND_UNITS_REQUEST, findAll);
}

export function* watchSaveUnit() {
    yield takeLatest(SAVE_UNIT_REQUEST, save);
}

export function* watchDeleteUnitById() {
    yield takeLatest(DELETE_REQUEST, deleteById);
}

export function* watchFindUnitById() {
    yield takeLatest(FIND_UNIT_REQUEST, findUnitById);
}



