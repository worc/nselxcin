import db from '../db';

const logOutcome = function(resolve, reject) {
    // can't use fat-arrow, db.run will put successful
    // data and message on the function context--"this"
    return function(error) {
        if(error) {
            console.error(error.message);
            reject(error.message);
        } else {
            console.log('success:', this);
            resolve(this);
        }
    };
};

function deleteRow(sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, logOutcome(resolve, reject));
    });
}

export default class Delete {
    static workbook(id) {
        const sql = `delete from Workbooks where Workbooks.id = ?`;
        const params = [id];
        return deleteRow(sql, params);
    }

    static lesson(id) {
        const sql = `delete from Lessons where Lessons.id = ?`;
        const params = [id];
        return deleteRow(sql, params);
    }

    static phrase(id) {
        const sql = `delete from Phrases where Phrases.id = ?`;
        const params = [id];
        return deleteRow(sql, params);
    }
}
