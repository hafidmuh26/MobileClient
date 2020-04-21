import {
    FIND_TRANSACTIONS_REQUEST,
    FIND_TRANSACTIONS_SUCCESS,
    FIND_TRANSACTIONS_FAILURE,
    
    FIND_TRANSACTION_REQUEST,
    FIND_TRANSACTION_SUCCESS,
    FIND_TRANSACTION_FAILURE,

    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,

    SAVE_TRANSACTION_REQUEST,
    SAVE_TRANSACTION_SUCCESS,
    SAVE_TRANSACTION_FAILURE,

    SUMMARY_TRANSACTION_REQUEST,
    SUMMARY_TRANSACTION_SUCCESS,
    SUMMARY_TRANSACTION_FAILURE,
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function TransactionById(state = defaultState, action) {
    switch (action.type) {
        case FIND_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function Transactions(state = [], action) {
    switch (action.type) {
        case FIND_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FIND_TRANSACTIONS_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case FIND_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function deleteTransactionById(state = defaultState, action) {
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

export function savedTransaction(state = defaultState, action) {
    switch (action.type) {
        case SAVE_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SAVE_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SAVE_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export function Summary(state = [], action) {
    switch (action.type) {
        case SUMMARY_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SUMMARY_TRANSACTION_SUCCESS:
            return {
                data: action.data,
                loading: false,
                error: null
            };
        case SUMMARY_TRANSACTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}




