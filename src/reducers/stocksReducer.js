import {
    FIND_STOCKS_REQUEST,
    FIND_STOCKS_SUCCESS,
    FIND_STOCKS_FAILURE,

    FIND_STOCK_REQUEST,
    FIND_STOCK_SUCCESS,
    FIND_STOCK_FAILURE,

    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    SAVE_STOCK_REQUEST,
    SAVE_STOCK_SUCCESS,
    SAVE_STOCK_FAILURE,

    SUMMARY_STOCK_REQUEST,
    SUMMARY_STOCK_SUCCESS,
    SUMMARY_STOCK_FAILURE,

} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function StockById(state = defaultState, action) {
    switch (action.type) {
        case FIND_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_STOCK_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function Stocks(state = [], action) {
    switch (action.type) {
        case FIND_STOCKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_STOCKS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_STOCKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function deleteStockById(state = defaultState, action) {
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

export function savedStock(state = defaultState, action) {
    switch (action.type) {
        case SAVE_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SAVE_STOCK_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SAVE_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function summary(state = [], action) {
    switch (action.type) {
        case SUMMARY_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SUMMARY_STOCK_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SUMMARY_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}




