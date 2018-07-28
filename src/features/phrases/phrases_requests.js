import axios from 'axios'

export function addPhrase(english, salish, audioUrl) {
    const body = {
        english,
        salish,
        audioUrl
    }
    return axios.post(`${ API_ENDPOINT }/api/phrase`, body)
}

export function getPhrases() {
    return axios.get(`${ API_ENDPOINT }/api/phrases`)
}

export function getPhrase(id) {
    return axios.get(`${ API_ENDPOINT }/api/phrase/${ id }`)
}

export function removePhrase(id) {
    return axios.delete(`${ API_ENDPOINT }/api/phrase/${ id }`)
}

export function changePhrase(id, english, salish, audioUrl) {
    const body = {
        english,
        salish,
        audioUrl
    }
    return axios.put(`${ API_ENDPOINT }/api/phrase/${ id }`, body)
}
