const Sequelize = require('sequelize');

const sequelize = new Sequelize('nselxcin', 'username', 'password', {
    dialect: "sqlite",
    storage: './nselxcin.db',
    operatorsAliases: false
});

sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch( err => {
        console.log('Unable to connect to the database:', err);
    });


//  MODELS
const Workbook = sequelize.define('Workbook', {
    title: Sequelize.TEXT,
    subtitle: Sequelize.TEXT,
    authors: Sequelize.TEXT,
    version: Sequelize.TEXT,
    edition: Sequelize.TEXT
});

const Lesson = sequelize.define('Lesson', {
    lessonNumber: Sequelize.INTEGER,
    lessonName: Sequelize.TEXT
});

const Phrase = sequelize.define('Phrase', {
    salish: Sequelize.TEXT,
    english: Sequelize.TEXT,
    audioUrl: Sequelize.TEXT
});

const LessonPhraseOrder = sequelize.define('LessonPhraseOrder', {
    viewOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

Lesson.belongsTo(Workbook, { foreignKey: 'workbookId', targetKey: 'id'});
Workbook.hasMany(Lesson, { foreignKey: 'workbookId', sourceKey: 'id'});

Lesson.hasMany(LessonPhraseOrder, { as: 'lessonId' });
Phrase.hasMany(LessonPhraseOrder, { as: 'phraseId' });

module.exports = sequelize.sync({ force: true }).then(() => {
    console.log('database created');
});
