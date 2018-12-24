import express from 'express'

import {
    DeleteByIdComposer,
    GetAllComposer,
    GetByIdComposer,
    PostComposer,
    UpdateByIdComposer,
} from '../transactions/_transaction_composers'

import Select from '../transactions/Select'
import Insert from '../transactions/Insert'
import Delete from '../transactions/Delete'
import Update from '../transactions/Update'

const router = express.Router()

router.get('/lessons', GetAllComposer(Select.allLessons, 'select all lessons'))
router.get('/lesson/:id', GetByIdComposer(Select.oneLesson, 'select lesson'))

router.post('/lesson', PostComposer(Insert.intoLessons, 'insert lesson'))

router.put('/lesson/:id', UpdateByIdComposer(Update.lesson, 'update lesson'))

router.delete('/lesson/:id', DeleteByIdComposer(Delete.lesson, 'delete lesson'))

export default router
