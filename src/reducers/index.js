import { combineReducers } from 'redux';
import { ItemById, Items, deleteItemById, savedItem } from './itemsReducer';
import { UnitById, Units, deleteUnitById, savedUnit } from './unitsReducer';
import { StockById, Stocks, deleteStockById, savedStock, summary } from './stocksReducer';
import { TransactionById, Transactions, deleteTransactionById, savedTransaction, Summary } from './transactionsReducer';
import { login } from './loginReducer';

export default combineReducers({
    ItemById, Items, deleteItemById, savedItem,
    UnitById, Units, deleteUnitById, savedUnit,
    StockById, Stocks, deleteStockById, savedStock, summary,
    TransactionById, Transactions, deleteTransactionById, savedTransaction, Summary,
    login
    
});