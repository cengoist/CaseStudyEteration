import { all, takeEvery, call, put } from 'redux-saga/effects';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from './slices/productsSlice';
import { fetchProducts } from '../utils/api';

function* handleFetchProducts() {
  try {
    const products = yield call(fetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* watchFetchProducts() {
  yield takeEvery(fetchProductsStart.type, handleFetchProducts);
}

export default function* rootSaga() {
  yield all([
    watchFetchProducts(),
  ]);
}
