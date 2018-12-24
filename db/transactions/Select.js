import db from '../db';

const logOutcome = function(resolve, reject) {
    // can't use fat-arrow, db.run will put successful
    // data and message on the function context--"this"
    return function(error, rows) {
        if(error) {
            console.error(error.message);
            reject(error.message);
        } else {
            console.log('success:', rows);
            resolve(rows);
        }
    };
};

function selectOne(sql, params) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, logOutcome(resolve, reject));
    });
}

function select(sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, logOutcome(resolve, reject));
    });
}

export default class Select {
    static allWorkbooks() {
        const sql = `select * from Workbooks`;
        return select(sql, []);
    }

    static oneFromWorkbooks(workbookId) {
        const sql = 'select * from Workbooks where Workbooks.id = ?';
        const params = [workbookId];
        return selectOne(sql, params);
    }

    static allLessonsPhrasesFromWorkbook(workbookId) {
        const sql = `
            select *
            from Phrases
            inner join Lessons on Phrases.lessonId = Lessons.id and Lessons.workbookId = ?
        `
        const params = [ workbookId ]
        return select(sql, params)
    }

    static allLessons() {
        const sql = `select * from Lessons`
        return select(sql, [])
    }

    static oneLesson(lessonId) {
        const sql = `select * from Lessons where Lessons.id = ?`
        const params = [ lessonId ]
        return selectOne(sql, params)
    }

    static fromLessons(workbookId) {
        const sql = `
            select * from Lessons where Lessons.workbookId = ?
            order by Lessons.lessonNumber asc
        `;
        const params = [workbookId];
        return select(sql, params);
    }

    static allPhrases() {
        const sql = `select * from Phrases`
        return select(sql)
    }

    static oneFromPhrases(phraseId) {
        const sql = `select * from Phrases where Phrases.id = ?`
        const params = [ phraseId ]
        return selectOne(sql, params)
    }
}
