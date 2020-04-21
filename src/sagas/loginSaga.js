import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../actions/constants';

import { commonAxios } from '../util/ApiUtil';
import { takeLatest, put } from 'redux-saga/effects';

function* login(action) {
    const {username, password} = action.data;
    try {
      commonAxios.post('auth/signin/', {username, password});
        
        yield put({
            type: LOGIN_SUCCESS,
            data: data
        });
    } catch (error) {
        yield put({
            type: LOGIN_FAILURE,
            error: error
        });
    }
}

export function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
}