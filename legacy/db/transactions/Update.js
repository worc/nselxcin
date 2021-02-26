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

function updateRow(sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, logOutcome(resolve, reject));
    });
}

function setStatementBuilder(attributes) {
    return Object.keys(attributes).reduce((accumulator, attribute, index, array) => {
        return `${accumulator} ${attribute} = ?${(index < array.length - 1) ? ',' : ''} `;
    }, 'set ');
}

export default class Update {
    static workbook(id, attributes) {
        const sql = ` update Workbooks ${setStatementBuilder(attributes)} where Workbooks.id = ?`;
        const params = Object.values(attributes).concat(id);
        return updateRow(sql, params);
    }

    static lesson(id, attributes) {
        const sql = ` update Lessons ${setStatementBuilder(attributes)} where Lessons.id = ?`;
        const params = Object.values(attributes).concat(id);
        return updateRow(sql, params);
    }

    static lessonPhraseViewOrder(lessonId, phraseId, viewOrder) {
        const sql = `update LessonPhrases ${ setStatementBuilder({ viewOrder })} where LessonPhrases.lessonId = ? and LessonPhrases.phraseId = ?`
        const params = [ lessonId, phraseId ]
        return updateRow(sql, params)
    }

    static phrase(id, attributes) {
        const sql = ` update Phrases ${setStatementBuilder(attributes)} where Phrases.id = ?`;
        const params = Object.values(attributes).concat(id);
        return updateRow(sql, params);
    }
}
