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

export default class Select {
    select(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, logOutcome(resolve, reject));
        });
    }

    allWorkbooks() {
        const sql = `select * from Workbooks`;
        return this.select(sql, []);
    }

    fromLessons(workbookId) {
        const sql = `select * from Lessons where Lessons.workbookId = ?`;
        const params = [workbookId];
        this.select(sql, params);
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
