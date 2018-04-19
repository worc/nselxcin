const sqlite3 = require('sqlite3').verbose();

const logSuccess = function(success) {
    return (error) => {
        if(error) {
            console.error(error.message);
        } else {
            console.log(success);
        }
    };
};

function insert(sql, params) {
    const db = new sqlite3.Database('./nselxcin.db', logSuccess('connect to database'));

    db.serialize(() => {
        db.run(sql, params, logSuccess('insert successful'));
        db.close(logSuccess('close database connection after insert'));
    })
}

function intoWorkbooks(title, subtitle, authors, edition, version) {
    const sql = `insert into workbooks(
        title,
        subtitle,
        authors,
        edition,
        version
    ) values(?, ?, ?, ?, ?)`;

    const params = [title, subtitle, authors, edition, version];
    insert(sql, params);
}

function intoPhrases(salish, english, audioUrl) {
    const sql = `insert into phrases(salish, english, audioUrl) values(?, ?, ?)`;
    const params = [salish, english, audioUrl];
    insert(sql, params);
}

function intoLessons(workbookId, lessonNumber, lessonName) {
    const sql = `insert into lessons(workbookId, lessonNumber, lessonName) values(?, ?, ?)`;
    const params = [workbookId, lessonNumber, lessonName];
    insert(sql, params);
}

module.exports = {
    intoWorkbooks,
    intoPhrases,
    intoLessons
};
