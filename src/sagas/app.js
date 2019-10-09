import { all, fork, select, take } from 'redux-saga/effects';
import * as c from '../reducers/app/constants';


// function* addCount() {
//     while (true) {
//         yield take(c.ADD_COUNT);
//         const { syncStorage } = yield select();
//         const count = syncStorage.count;

//             chrome.storage.sync.set({'count': count + 1}, function() {
//                 console.log('Value is set to ' + count);
//             });
//     }
// }

function* watch() {
    yield all([
        // fork(addCount),
    ]);
}

export default watch;