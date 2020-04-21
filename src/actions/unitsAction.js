import {
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    FIND_UNITS_REQUEST,
    FIND_UNITS_SUCCESS,
    FIND_UNITS_FAILURE,
    
    FIND_UNIT_REQUEST,
    FIND_UNIT_SUCCESS,
    FIND_UNIT_FAILURE,

    SAVE_UNIT_REQUEST,
    SAVE_UNIT_SUCCESS,
    SAVE_UNIT_FAILURE,

} from './constants';


export function save( data ) {
    return {
        type: SAVE_UNIT_REQUEST,
        data: data
    };
}

export function findUnitById( id ) {
    return {
        type: FIND_UNIT_REQUEST,
        id: id
    };
}

export function findAll( params ) {
    return {
        type: FIND_UNITS_REQUEST,
        params: params
    };
}

export function deleteById( id ) {
    return {
        type: DELETE_REQUEST,
        id: id
    };
}

