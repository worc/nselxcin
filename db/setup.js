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
    db.run('drop table if exists Workbooks');
    db.run(`create table Workbooks(
        id integer primary key autoincrement,
        title text,
        subtitle text,
        authors text,
        edition text,
        version text
    )`);

    db.run('drop table if exists Lessons');
    db.run(`create table Lessons(
        id integer primary key autoincrement,
        workbookId integer,
        lessonNumber integer,
        lessonName text,
        foreign key(workbookId) references Workbooks(id)
    )`);

    db.run('drop table if exists Phrases');
    db.run(`create table Phrases(
        id integer primary key autoincrement,
        salish text,
        english text,
        audioUrl text    
    )`);

    db.run('drop table if exists LessonPhrases');
    db.run(`create table LessonPhrases(
        lessonId integer not null,
        phraseId integer not null,
        viewOrder integer default 0,
        foreign key(lessonId) references Lessons(id),
        foreign key(phraseId) references Phrases(id)
    )`);
});

db.close((error) => {
    if(error) {
        return console.error(error.message);
    }

    console.log('close the database connection');
});
