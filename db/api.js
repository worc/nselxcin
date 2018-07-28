// todo if ENV.DEBUG then console.log/error
// todo handle 404s and 403s

import express from 'express';
import bodyParser from 'body-parser';
import Insert from './transactions/Insert';
import Select from './transactions/Select';
import Delete from './transactions/Delete';
import Update from './transactions/Update';

import PhraseRoutes from './api_routes/phrase_routes'
import LessonRoutes from './api_routes/lesson_routes'

const api = express()
const PORT = process.env.PORT || 8080
const router = express.Router();
router.use(bodyParser.json({ type: 'application/json'}));

export function UpdateByIdComposer(task,taskName) {
    return (req, res) => {
        task(req.params.id, req.body).then((message) => {
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

export function DeleteByIdComposer(task, taskName) {
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

export function GetByIdComposer(task, taskName) {
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

export function GetAllComposer(task, taskName) {
    return (req, res) => {
        task().then((message) => {
            console.log(`${taskName}:`, message);
            res.status(200).send(message);
        }).catch((error) => {
            console.error(`${taskName} error: ${error}`);
            res.status(500).send();
        });
    }
}

export function PostComposer(task, taskName) {
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

export function PostByParamsComposer(task, taskName) {
    return function(req, res) {
        task(req.params, req.body).then(message => {
            console.log(`${ taskName }:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData)
        })
    }
}

router.put('/workbook/:id', UpdateByIdComposer(Update.workbook, 'update workbook'));

router.delete('/workbook/:id', DeleteByIdComposer(Delete.workbook, 'delete workbook'));

router.get('/workbook/:id', GetByIdComposer(Select.oneFromWorkbooks, 'select workbook'));

router.get('/workbook/:id/lessons', GetByIdComposer(Select.fromLessons, 'select lessons'));

router.get('/workbooks', GetByIdComposer(Select.allWorkbooks, 'select workbooks'));

router.post('/workbook', PostComposer(Insert.intoWorkbooks, 'insert workbook'));

router.post('/lesson-phrase-order',
    PostComposer(Insert.intoLessonPhrases, 'insert lesson phrase order'));

api.use('/api', router)
api.use('/api', PhraseRoutes)
api.use('/api', LessonRoutes)

api.listen(PORT, () => {
    console.log('API server listening on', PORT)
})
