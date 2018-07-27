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

    static fromLessons(workbookId) {
        const sql = `
            select * from Lessons where Lessons.workbookId = ?
            order by Lessons.lessonNumber asc
        `;
        const params = [workbookId];
        return select(sql, params);
    }

    static fromLessonPhrases(lessonId) {
        const sql = `
            select Phrases.salish, Phrases.english, Phrases.audioUrl, LessonPhrases.viewOrder from Phrases
            inner join LessonPhrases on Phrases.id = LessonPhrases.phraseId and LessonPhrases.lessonId = ?
            order by LessonPhrases.viewOrder, Phrases.english, Phrases.salish asc
        `;
        return select(sql, [lessonId]);
    }

    static allPhrases() {
        const sql = `select * from Phrases`
        return select(sql)
    }
}
