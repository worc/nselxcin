import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as API from './phrases_requests'
import * as Action from './phrases_actions'

export function* addPhrase(message) {
    try {
        const response = yield call(API.addPhrase, message.english, message.salish, message.audioUrl)
        yield put({ type: Action.RECEIVE_PHRASE, phrase: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* getPhrases() {
    try {
        const response = yield call(API.getPhrases)
        yield put({ type: Action.RECEIVE_PHRASES, phraseList: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* getPhrase(message) {
    try {
        const response = yield call(API.getPhrase, message.id)
        yield put({ type: Action.RECEIVE_PHRASE, phrase: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export default function* () {
    yield takeEvery(Action.ADD_PHRASE, addPhrase)
    yield takeLatest(Action.GET_PHRASES, getPhrases)
    yield takeLatest(Action.GET_PHRASE, getPhrase)
}
