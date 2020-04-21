import { all, fork } from 'redux-saga/effects';
import { watchFindsItems, watchDeleteItemById, watchFindItemById, watchSaveItem } from './itemsSaga';
import { watchFindsUnits, watchDeleteUnitById, watchFindUnitById, watchSaveUnit } from './unitsSaga';
import { watchFindsStocks, watchDeleteStockById, watchFindStockById, watchSaveStock, watchStockSummary } from './stocksSaga';
import { watchFindsTransaction, watchDeleteTransactionById, watchFindTransactionById, watchSaveTransaction, watchTransactionSummary } from './transactionsSaga';
import { watchLogin } from './loginSaga';

export default function* rootSaga() {
    yield all([
        fork(watchFindsItems),
        fork(watchDeleteItemById),
        fork(watchFindItemById),
        fork(watchSaveItem),

        fork(watchFindsUnits),
        fork(watchSaveUnit),
        fork(watchDeleteUnitById),
        fork(watchFindUnitById),

        fork(watchFindsStocks),
        fork(watchSaveStock),
        fork(watchDeleteStockById),
        fork(watchFindStockById),
        fork(watchStockSummary),

        fork(watchFindsTransaction),
        fork(watchDeleteTransactionById),
        fork(watchFindTransactionById),
        fork(watchSaveTransaction),
        fork(watchTransactionSummary),

        fork(watchLogin)

    ]);
}