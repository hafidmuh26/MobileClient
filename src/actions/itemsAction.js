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

} from './constants';


export function save( data ) {
    return {
        type: SAVE_ITEM_REQUEST,
        data: data
    };
}

export function findItemById( id ) {
    return {
        type: FIND_ITEM_REQUEST,
        id: id
    };
}

export function findAll( params ) {
    return {
        type: FIND_ITEMS_REQUEST,
        params: params
    };
}

export function deleteByid( id ) {
    return {
        type: DELETE_REQUEST,
        id: id
    };
}

