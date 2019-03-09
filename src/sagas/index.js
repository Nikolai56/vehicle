import { put, takeLatest } from 'redux-saga/effects';
import {
    ActionTypes,
    requestSignals,
    requestSignalsSuccess,
    requestSignalsError,
} from '../actions';
import jsonData from './02-response';

function* fetchSignals() {
    try {
        yield put(requestSignals());
        /*    const data = yield call(() => {
      return fetch(URL)
        .then(res => res.json());
    });*/
        if (jsonData.status === 'ok') {
            yield put(requestSignalsSuccess(jsonData.data));
        }
    } catch (error) {
        yield put(requestSignalsError(error.message));
    }
}

function* rootSaga() {
    yield takeLatest(ActionTypes.FETCHED_SIGNALS, fetchSignals);
}

export default rootSaga;
