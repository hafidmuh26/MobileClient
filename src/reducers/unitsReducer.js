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

const defaultState = { data: null, loading: false, error: null };

export function UnitById(state = defaultState, action) {
    switch (action.type) {
        case FIND_UNIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_UNIT_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_UNIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function Units(state = [], action) {
    switch (action.type) {
        case FIND_UNITS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_UNITS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_UNITS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function deleteUnitById(state = defaultState, action) {
    switch (action.type) {
        case DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function savedUnit(state = defaultState, action) {
    switch (action.type) {
        case SAVE_UNIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SAVE_UNIT_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SAVE_UNIT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}




