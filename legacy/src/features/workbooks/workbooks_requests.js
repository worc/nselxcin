import axios from 'axios'

export function getWorkbook(workbookId) {
    return axios.get(`${ API_ENDPOINT }/api/workbook/${ workbookId }`)
}

export function getWorkbooks() {
    return axios.get(`${ API_ENDPOINT }/api/workbooks`)
}

export function addWorkbook({ title, subtitle, authors, edition, version }) {
    const body = {
        title,
        subtitle,
        authors,
        edition,
        version
    }

    return axios.post(`${ API_ENDPOINT }/api/workbook`, body)
}

export function editWorkbook({ workbookId, title, subtitle, authors, edition, version }) {
    const body = {
        title,
        subtitle,
        authors,
        edition,
        version
    }

    return axios.put(`${ API_ENDPOINT }/api/workbook/${ workbookId }`, body)
}

export function deleteWorkbook(workbookId) {
    return axios.delete(`${ API_ENDPOINT }/api/workbook/${ workbookId }`)
}
