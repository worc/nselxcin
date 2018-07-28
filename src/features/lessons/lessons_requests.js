import axios from 'axios'

export function addLesson(lessonName) {
    const body = {
        lessonName
    }

    return axios.post(`${ API_ENDPOINT }/api/lesson`, body)
}

export function addPhraseToLesson(phraseId, lessonId, viewOrder = 0) {
    const body = {
        phraseId,
        viewOrder
    }

    return axios.post(`${ API_ENDPOINT }/api/lesson/${ lessonId }/phrase`, body)
}

export function getLesson(lessonId) {
    return axios.get(`${ API_ENDPOINT }/api/lesson/${ lessonId }`)
}

export function getLessons() {
    return axios.get(`${ API_ENDPOINT }/api/lessons`)
}

export function getLessonPhrases(lessonId) {
    return axios.get(`${ API_ENDPOINT }/api/lesson/${ lessonId }/phrases`)
}

export function editLesson({ id, lessonName }) {
    const body = {
        lessonName
    }

    return axios.put(`${ API_ENDPOINT }/api/lesson/${ id }`, body)
}

export function editLessonPhraseViewOrder({ lessonId, phraseId, viewOrder }) {
    const body = {
        viewOrder: viewOrder
    }

    return axios.put(`${ API_ENDPOINT }/api/lesson/${ lessonId }/phrase/${ phraseId }`, body)
}

export function deleteLesson(lessonId) {
    return axios.delete(`${ API_ENDPOINT }/api/lesson/${ lessonId }`)
}

export function removePhraseFromLesson(phraseId, lessonId) {
    return axios.delete(`${ API_ENDPOINT }/api/lesson/${ lessonId }/phrase/${ phraseId }`)
}
