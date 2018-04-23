import sqlite3 from "sqlite3";

const logOutcome = function(resolve, reject) {
    // can't use fat-arrow, db.run will put successful
    // data and message on the function context--"this"
    return function(error, rows) {
        if(error) {
            console.error(error.message);
            reject(error.message);
        } else {
            console.log('success:', this);
            resolve(rows);
        }
    };
};

export default class Select {
    constructor() {
        this.db = new sqlite3.Database(__dirname + '/nselxcin.db', logOutcome(() => 'connected'), () => 'failed');
    }

    select(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, logOutcome(resolve, reject));
        });
    }

    allWorkbooks() {
        const sql = `select * from Workbooks`;
        return this.select(sql, []);
    }

    fromLessons(workbookId) {
        const sql = `select * from Lessons where Lessons.workbookId = ?`;
        const params = [workbookId];
        return this.select(sql, params);
    }

    fromLessonPhrases(lessonId) {
        const sql = `
            select Phrases.salish, Phrases.english, Phrases.audioUrl, LessonPhrases.viewOrder from Phrases
            inner join LessonPhrases on Phrases.id = LessonPhrases.phraseId and LessonPhrases.lessonId = ?
            order by LessonPhrases.viewOrder, Phrases.english, Phrases.salish asc
        `;
        return this.select(sql, [lessonId]);
    }
}
