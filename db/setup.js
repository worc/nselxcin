const sqlite3 = require('sqlite3').verbose();

const logError = function(error) {
    if(error) {
        console.error(error.message);
    }
};

// three opening modes, flagged by using sqlite3 constants
// defaults to OPEN_READWRITE | OPEN_CREATE
// in other words, if the db doesn't exist, creates it and makes
// it ready for read/write

// sqlite3.OPEN_READONLY;
// sqlite3.OPEN_READWRITE;
// sqlite3.OPEN_CREATE;
// new sqlite3.Database('path/to/.db', OPENING_MODE, callback);
let db = new sqlite3.Database('./nselxcin.db', logError);

db.serialize(() => {
    db.run('drop table if exists workbooks');
    db.run(`create table workbooks(
        id integer primary key,
        title text,
        subtitle text,
        authors text,
        edition text,
        version text
    )`);

    db.run('drop table if exists lessons');
    db.run(`create table lessons(
        id integer primary key,
        workbookId integer,
        lessonNumber integer,
        lessonName text,
        foreign key(workbookId) references workbooks(id)
    )`);

    db.run('drop table if exists phrases');
    db.run(`create table phrases(
        id integer primary key,
        salish text,
        english text,
        audioUrl text    
    )`);

    db.run('drop table if exists phraselists');
    db.run(`create table phraselists(
        lessonId integer,
        phraseId integer,
        view_order integer default 0,
        foreign key(lessonId) references lessons(id),
        foreign key(phraseId) references phrases(id)
    )`);
});

db.close((error) => {
    if(error) {
        return console.error(error.message);
    }

    console.log('close the database connection');
});
