import axios from 'axios'

export function addPhrase(english, salish, audioUrl) {
    const body = {
        english,
        salish,
        audioUrl
    }
    return axios.post(`${ API_ENDPOINT }/api/phrase`, body).then(response => response.data)
}

export function getPhrases() {
    return axios.get(`${ API_ENDPOINT }/api/phrases`).then(response => response.data)
}

export function getPhrase(id) {
    return axios.get(`${ API_ENDPOINT }/api/phrase/${ id }`).then(response => response.data)
}

export function removePhrase(id) {
    return axios.delete(`${ API_ENDPOINT }/api/phrase/${ id }`).then(response => response.data)
}

export function changePhrase(id, english, salish, audioUrl) {
    const body = {
        english,
        salish,
        audioUrl
    }
    return axios.put(`${ API_ENDPOINT }/api/phrases/${ id }`, body).then(response => response.data)
}
