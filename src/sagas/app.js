/**
 * @module Sagas/App
 * @desc App
 */
import { all, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

/**
 * App Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.SWITCH_MENU)]);
}
