import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

} from './constants';


export function login( data ) {
    return {
        type: LOGIN_REQUEST,
        data: data
    };
}



