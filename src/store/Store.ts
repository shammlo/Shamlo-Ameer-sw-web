//********** IMPORTS ************* */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers/rootReducer';
import logger from 'redux-logger';
import { productsSaga } from './sagas/rootSaga';
//********************************

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? (typeof window != 'undefined' && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;

const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(productsSaga);

export { Store };
