//********** IMPORTS ************* */
import { takeEvery } from 'redux-saga/effects';
import { actionTypes } from '../actions/actionTypes';
import { getProductsSaga } from './productsSaga/ProductsSaga';
//********************************

export function* productsSaga(): Generator {
    yield takeEvery(actionTypes.FETCH_PRODUCTS, getProductsSaga);
}
