import {
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    FIND_STOCKS_REQUEST,
    FIND_STOCKS_SUCCESS,
    FIND_STOCKS_FAILURE,
    
    FIND_STOCK_REQUEST,
    FIND_STOCK_SUCCESS,
    FIND_STOCK_FAILURE,

    SAVE_STOCK_REQUEST,
    SAVE_STOCK_SUCCESS,
    SAVE_STOCK_FAILURE,

    SUMMARY_STOCK_REQUEST,
    SUMMARY_STOCK_SUCCESS,
    SUMMARY_STOCK_FAILURE,

} from './constants';


export function save( data ) {
    return {
        type: SAVE_STOCK_REQUEST,
        data: data
    };
}

export function findById( id ) {
    return {
        type: FIND_STOCK_REQUEST,
        id: id
    };
}

export function findAll( params ) {
    return {
        type: FIND_STOCKS_REQUEST,
        params: params
    };
}

export function deleteByid( id ) {
    return {
        type: DELETE_REQUEST,
        id: id
    };
}

export function summary() {
    return {
        type: SUMMARY_STOCK_REQUEST,
    };
}

