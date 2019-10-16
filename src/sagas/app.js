import { all, fork, select, take, call } from 'redux-saga/effects';
import {isEmpty} from 'lodash';
import * as c from '../reducers/app/constants';


// function* addCount() {
    // while (true) {
        // yield take(c.ADD_COUNT);
        // const { syncStorage } = yield select();
        // const count = syncStorage.count;

        //     chrome.storage.sync.set({'count': count + 1}, function() {
        //         console.log('Value is set to ' + count);
        //     });
        // const items = yield call([chrome.storage.sync, chrome.storage.sync.get], ['quickReplies'], (items) => {
        //     if(isEmpty(items)) return [];
        //     const normalizedData = Object.values(items.quickReplies);
        //     return normalizedData;
        // });
    // }
// }

function* watch() {
    yield all([
        // fork(addCount),
    ]);
}

export default watch;