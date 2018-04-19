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
    title: Sequelize.STRING,
    subtitle: Sequelize.STRING,
    authors: Sequelize.STRING,
    version: Sequelize.STRING,
    edition: Sequelize.STRING
});

const Lesson = sequelize.define('Lesson', {
    lessonNumber: Sequelize.INTEGER,
    lessonName: Sequelize.STRING
});

const Phrase = sequelize.define('Phrase', {
    salish: Sequelize.STRING,
    english: Sequelize.STRING,
    audioUrl: Sequelize.STRING
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

// Workbook.sync({ force: true }).then(() => {
//     return Workbook.create({
//         title: 'nselxcin 1',
//         subtitle: 'beginner ad stuff'
//     })
// });

sequelize.sync({ force: true }).then(() => {
    Workbook.create({
        title: 'nselxcin 1',
        subtitle: 'beginner ad stuff'
    }).then(() => {
        Lesson.create({
            lessonNumber: 1,
            lessonName: 'Greetings'
        });
    });
});

