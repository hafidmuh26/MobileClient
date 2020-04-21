import {
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    FIND_TRANSACTIONS_REQUEST,
    FIND_TRANSACTIONS_SUCCESS,
    FIND_TRANSACTIONS_FAILURE,
    
    FIND_TRANSACTION_REQUEST,
    FIND_TRANSACTION_SUCCESS,
    FIND_TRANSACTION_FAILURE,

    SAVE_TRANSACTION_REQUEST,
    SAVE_TRANSACTION_SUCCESS,
    SAVE_TRANSACTION_FAILURE,

    SUMMARY_TRANSACTION_REQUEST,
    SUMMARY_TRANSACTION_SUCCESS,
    SUMMARY_TRANSACTION_FAILURE,

} from './constants';


export function save( data ) {
    return {
        type: SAVE_TRANSACTION_REQUEST,
        data: data
    };
}

export function findById( id ) {
    return {
        type: FIND_TRANSACTION_REQUEST,
        id: id
    };
}

export function findAll( params ) {
    return {
        type: FIND_TRANSACTIONS_REQUEST,
        params: params
    };
}

export function deleteByid( id ) {
    return {
        type: DELETE_REQUEST,
        id: id
    };
}

export function summary( params ) {
    return {
        type: SUMMARY_TRANSACTION_REQUEST,
        params: params
    };
}

