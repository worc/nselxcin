import sqlite3 from 'sqlite3';

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

export default class Insert {
    constructor() {
        this.db = new sqlite3.Database(__dirname + '/nselxcin.db', logOutcome(() => 'connected'), () => 'failed');
    }

    insert(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, logOutcome(resolve, reject));
        });
    }

    intoWorkbooks({ title = '', subtitle = '', authors = '', version = '', edition = '' }) {
        console.log('title:', title);
        console.log('subtitle:', subtitle);
        const sql = `insert into Workbooks(title, subtitle, authors, version, edition) values(?, ?, ?, ?, ?)`;
        const params = [title, subtitle, authors, version, edition];
        console.log(params);
        return this.insert(sql, params);
    }

    intoPhrases({ salish = '', english = '', audioUrl = '' }) {
        const sql = `insert into Phrases(salish, english, audioUrl) values(?, ?, ?)`;
        const params = [salish, english, audioUrl];
        return this.insert(sql, params);
    }

    intoLessons({ workbookId, lessonNumber = 0, lessonName = '' }) {
        const sql = `insert into Lessons(workbookId, lessonNumber, lessonName) values(?, ?, ?)`;
        const params = [ workbookId, lessonNumber, lessonName ];
        return this.insert(sql, params);
    }

    intoLessonPhrases({ lessonId, phraseId, viewOrder }) {
        const sql = `insert into LessonPhrases(lessonId, phraseId, viewOrder) values(?, ?, ?)`;
        const params = [lessonId, phraseId, viewOrder];
        return this.insert(sql, params);
    }
}
