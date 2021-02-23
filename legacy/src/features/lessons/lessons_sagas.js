import { call, put, takeEvery, takeLatest, throttle } from 'redux-saga/effects'
import * as api from './lessons_requests'
import * as action from './lessons_actions'

export function* addLesson(message) {
    try {
        const response = yield call(api.addLesson, message.lessonName)
        yield put({ type: action.RECEIVE_LESSON, lesson: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* addPhraseToLesson(message) {
    try {
        const response = yield call(api.addPhraseToLesson, message.lessonId, message.phraseId, message.viewOrder)
        yield put({ type: action.PHRASE_ADDED_TO_LESSON, lessonPhrase: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* getLesson(message) {
    try {
        const response = yield call(api.getLesson, message.id)
        yield put({ type: action.RECEIVE_LESSON, lesson: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* getLessons() {
    try {
        const response = yield call(api.getLessons)
        yield put({ type: action.RECEIVE_LESSONS, lessonList: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* getLessonPhrases(message) {
    try {
        const response = yield call(api.getLessonPhrases, message.id)
        yield put({ type: action.RECEIVE_LESSON_PHRASES, lessonId: message.id, phraseList: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* editLesson(message) {
    try {
        // todo check message for valid params
        const response = yield call(api.editLesson, ...message)
        yield put({ type: action.LESSON_CHANGED, sparseLesson: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* editLessonPhraseViewOrder(message) {
    try {
        const response = yield call(api.editLessonPhraseViewOrder, message.lessonId, message.phraseId, message.viewOrder)
        yield put({ type: action.LESSON_PHRASE_ORDER_CHANGED, lessonPhrase: response.data })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* deleteLesson(message) {
    try {
        yield call(api.deleteLesson, message.id)
        yield put({ type: action.LESSON_DELETED, id: message.id })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export function* removePhraseFromLesson(message) {
    try {
        yield call(api.removePhraseFromLesson, message.phraseId, message.lessonId)
        yield put({ type: action.PHRASE_REMOVED_FROM_LESSON, phraseId: message.phraseId, lessonId: message.lessonId })
    } catch(e) {
        // todo create error handler feature (reducer, component, saga, etc)
        console.error(e)
    }
}

export default function* () {
    yield takeEvery(action.ADD_LESSON, addLesson)
    yield takeEvery(action.ADD_PHRASE_TO_LESSON, addPhraseToLesson)
    yield takeEvery(action.GET_LESSON, getLesson)
    yield takeLatest(action.GET_LESSONS, getLessons)
    yield takeLatest(action.GET_LESSON_PHRASES, getLessonPhrases)
    yield takeEvery(action.EDIT_LESSON, editLesson)
    yield takeEvery(action.EDIT_LESSON_PHRASE_ORDER, editLessonPhraseViewOrder)
    yield throttle(action.DELETE_LESSON, deleteLesson)
    yield takeEvery(action.REMOVE_PHRASE_FROM_LESSON, removePhraseFromLesson)
}
