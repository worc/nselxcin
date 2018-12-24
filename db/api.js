// todo if ENV.DEBUG then console.log/error
// todo handle 404s and 403s

import express from 'express';
import bodyParser from 'body-parser';

import {
    GetByIdComposer,
} from './transactions/_transaction_composers'

import Select from './transactions/Select';

import PhraseRoutes from './api_routes/phrase_routes'
import LessonRoutes from './api_routes/lesson_routes'
import WorkbookRoutes from './api_routes/workbook_routes'

const api = express()
const PORT = process.env.PORT || 8080
const router = express.Router();
router.use(bodyParser.json({ type: 'application/json'}));

router.get('/workbook/:id/lessons', GetByIdComposer(Select.fromLessons, 'select lessons'));

api.use('/api', router)
api.use('/api', PhraseRoutes)
api.use('/api', LessonRoutes)
api.use('/api', WorkbookRoutes)

api.listen(PORT, () => {
    console.log('API server listening on', PORT)
})
