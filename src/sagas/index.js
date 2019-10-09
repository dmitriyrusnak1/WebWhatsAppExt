import { all, fork } from 'redux-saga/effects';

import watchApp from './app';


export default function* root() {
    yield all([
        fork(watchApp),
    ]);
}