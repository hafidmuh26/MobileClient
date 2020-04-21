import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';


const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const store = createStore(reducers, middleware);

sagaMiddleware.run(rootSaga);

export default store;