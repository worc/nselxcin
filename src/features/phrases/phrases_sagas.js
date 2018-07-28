import { call, put, takeEvery } from 'redux-saga/effects'
import * as API from './phrases_requests'
import * as Action from './phrases_actions'

export function* addPhrase(message) {
    try {
        const response = yield call(API.addPhrase, message.english, message.salish, message.audioUrl)
        yield put({ type: Action.RECEIVE_PHRASE, phrase: response })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export default function* () {
    yield takeEvery(Action.ADD_PHRASE, addPhrase)
}
