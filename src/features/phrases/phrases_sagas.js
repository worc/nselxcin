import { call, put, takeEvery, takeLatest, throttle } from 'redux-saga/effects'
import * as api from './phrases_requests'
import * as action from './phrases_actions'

export function* addPhrase(message) {
    try {
        const response = yield call(api.addPhrase, message.english, message.salish, message.audioUrl)
        yield put({ type: action.RECEIVE_PHRASE, phrase: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* getPhrases() {
    try {
        const response = yield call(api.getPhrases)
        yield put({ type: action.RECEIVE_PHRASES, phraseList: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* getPhrase(message) {
    try {
        const response = yield call(api.getPhrase, message.id)
        yield put({ type: action.RECEIVE_PHRASE, phrase: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* removePhrase(message) {
    try {
        // the data object is undefined on the response
        // but there is a full response object yielded here
        yield call(api.removePhrase, message.id)
        yield put({ type: action.PHRASE_REMOVED, id: message.id })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* changePhrase(message) {
    try {
        // todo check message for valid params
        const response  = yield call(api.changePhrase, ...message)
        yield put({ type: action.PHRASE_CHANGED, sparsePhrase: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export default function* () {
    yield takeEvery(action.ADD_PHRASE, addPhrase)
    yield takeLatest(action.GET_PHRASES, getPhrases)
    yield takeEvery(action.GET_PHRASE, getPhrase)
    yield throttle(1000, action.REMOVE_PHRASE, removePhrase)
    yield takeEvery(action.CHANGE_PHRASE, changePhrase)
}
