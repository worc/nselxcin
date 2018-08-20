// todo if ENV.DEBUG then console.log/error
// todo handle 404s and 403s

import express from 'express';
import bodyParser from 'body-parser';
import Insert from './transactions/Insert';
import Select from './transactions/Select';

import PhraseRoutes from './api_routes/phrase_routes'
import LessonRoutes from './api_routes/lesson_routes'
import WorkbookRoutes from './api_routes/workbook_routes'

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

export function UpdateByParamsComposer(task, taskName) {
    return (req, res) => {
        task(req.params, req.body).then(message => {
            console.log(`${ taskName }:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData);
        })
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

export function DeleteByParamsComposer(task, taskName) {
    return (req, res) => {
        task(req.params, req.body).then(message => {
            console.log(`${ taskName }:`, message)
            const reqBody = req.body
            const responseData = {
                id: message.lastID,
                ...reqBody
            }
            res.status(200).send(responseData);
        })
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



router.get('/workbook/:id/lessons', GetByIdComposer(Select.fromLessons, 'select lessons'));

router.post('/lesson-phrase-order',
    PostComposer(Insert.intoLessonPhrases, 'insert lesson phrase order'));

api.use('/api', router)
api.use('/api', PhraseRoutes)
api.use('/api', LessonRoutes)
api.use('/api', WorkbookRoutes)

api.listen(PORT, () => {
    console.log('API server listening on', PORT)
})
