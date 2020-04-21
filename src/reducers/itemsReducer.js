import {
    FIND_ITEMS_REQUEST,
    FIND_ITEMS_SUCCESS,
    FIND_ITEMS_FAILURE,

    FIND_ITEM_REQUEST,
    FIND_ITEM_SUCCESS,
    FIND_ITEM_FAILURE,

    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    SAVE_ITEM_REQUEST,
    SAVE_ITEM_SUCCESS,
    SAVE_ITEM_FAILURE,
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function ItemById(state = defaultState, action) {
    switch (action.type) {
        case FIND_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function Items(state = [], action) {
    switch (action.type) {
        case FIND_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_ITEMS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function deleteItemById(state = defaultState, action) {
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

export function savedItem(state = defaultState, action) {
    switch (action.type) {
        case SAVE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SAVE_ITEM_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SAVE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}




