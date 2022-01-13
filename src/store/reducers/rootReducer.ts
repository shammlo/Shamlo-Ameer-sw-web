//********** IMPORTS ************* */
import { combineReducers } from 'redux';
import { productReducer } from './productReducer/productReducer';
//********************************
const rootReducer = combineReducers({
    // ...your other reducers here
    productData: productReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export { rootReducer };
