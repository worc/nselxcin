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

function insert(sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, logOutcome(resolve, reject));
    });
}

export default class Insert {
    static intoWorkbooks({ title = '', subtitle = '', authors = '', version = '', edition = '' }) {
        const sql = `insert into Workbooks(title, subtitle, authors, version, edition) values(?, ?, ?, ?, ?)`;
        const params = [title, subtitle, authors, version, edition];
        console.log('insert into Workbooks params', params);
        return insert(sql, params);
    }

    static intoPhrases({ salish = '', english = '', audioUrl = '', viewOrder = 0, lessonId ='' }) {
        const sql = `insert into Phrases(salish, english, audioUrl, viewOrder, lessonId) values(?, ?, ?, ?, ?)`;
        const params = [salish, english, audioUrl, viewOrder, lessonId];
        return insert(sql, params);
    }

    static intoLessons({ lessonName = '', lessonNumber = 0, workbookId = '' }) {
        const sql = `insert into Lessons(lessonName, lessonNumber, workbookId) values(?, ?, ?)`;
        const params = [ lessonName, lessonNumber, workbookId ];
        return insert(sql, params);
    }
}
