// todo if ENV.DEBUG then console.log/error
// todo handle 404s and 403s

import express from 'express';
import bodyParser from 'body-parser';
import Insert from './transactions/Insert';
import Select from './transactions/Select';
import Delete from './transactions/Delete';
import Update from './transactions/Update';

const api = express()
const PORT = process.env.PORT || 8080
const router = express.Router();
router.use(bodyParser.json({ type: 'application/json'}));

function UpdateByIdComposer(task,taskName) {
    return (req, res) => {
        task(req.params.id, req.body).then((message) => {
            console.log(`${taskName}:`, message);
            res.status(200).send();
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`);
            res.status(500).send();
        });
    }
}

function DeleteByIdComposer(task, taskName) {
    return (req, res) => {
        task(req.params.id).then((message) => {
            console.log(`${taskName}:`, message);
            res.status(200).send();
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`);
            res.status(500).send();
        });
    }
}

function GetByIdComposer(task, taskName) {
    return (req, res) => {
        task(req.params.id).then((message) => {
            console.log(`${taskName}:`, message);
            res.status(200).send(message);
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`);
            res.status(500).send();
        });
    }
}

function PostComposer(task, taskName) {
    return function(req, res) {
        task(req.body).then((message) => {
            console.log(`${taskName}:`, message);
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData);
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`);
            res.status(500).send();
        });
    }
}

router.put('/phrase/:id', UpdateByIdComposer(Update.phrase, 'update phrase'));

router.put('/lesson/:id', UpdateByIdComposer(Update.lesson, 'update lesson'));

router.put('/workbook/:id', UpdateByIdComposer(Update.workbook, 'update workbook'));

router.delete('/phrase/:id', DeleteByIdComposer(Delete.phrase, 'delete phrase'));

router.delete('/lesson/:id', DeleteByIdComposer(Delete.lesson, 'delete lesson'));

router.delete('/workbook/:id', DeleteByIdComposer(Delete.workbook, 'delete workbook'));

router.get('/lesson/:id/phrases', GetByIdComposer(Select.fromLessonPhrases, 'select phrases'));

router.get('/workbook/:id', GetByIdComposer(Select.oneFromWorkbooks, 'select workbook'));

router.get('/workbook/:id/lessons', GetByIdComposer(Select.fromLessons, 'select lessons'));

router.get('/workbooks', GetByIdComposer(Select.allWorkbooks, 'select workbooks'));

router.post('/workbook', PostComposer(Insert.intoWorkbooks, 'insert workbook'));

router.post('/lesson', PostComposer(Insert.intoLessons, 'insert lesson'));

router.post('/phrase', PostComposer(Insert.intoPhrases, 'insert phrase'));

router.post('/lesson-phrase-order',
    PostComposer(Insert.intoLessonPhrases, 'insert lesson phrase order'));

api.use('/api', router)

api.listen(PORT, () => {
    console.log('API server listening on', PORT)
})
