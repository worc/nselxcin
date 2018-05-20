import axios from 'axios';

export default class Request {
    static allWorkbooks() {
        return axios.get('/api/workbooks');
    }

    static oneWorkbook(id) {
        return axios.get(`/api/workbook/${id}`);
    }

    static addWorkbook(attributes) {
        const params = { ...attributes };
        return axios.post('/api/workbook', { ...attributes })
    }

    static updateWorkbook(id, attributes) {
        return axios.put(`/api/workbook/${id}`, { ...attributes });
    }

    static deleteWorkbook(id) {
        return axios.delete(`/api/workbook/${id}`);
    }

    static lessons(workbookId) {
        return axios.get(`/api/workbook/${workbookId}/lessons`);
    }

    static phrases(lessonId) {
        return axios.get(`/api/lesson/${lessonId}/phrases`);
    }
}
