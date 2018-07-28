import express from 'express'

import {
    DeleteByIdComposer,
    GetAllComposer,
    GetByIdComposer,
    PostByParamsComposer,
    PostComposer,
    UpdateByIdComposer
} from '../api'

import Select from '../transactions/Select'
import Insert from '../transactions/Insert'
import Delete from '../transactions/Delete'
import Update from '../transactions/Update'

const router = express.Router()

router.get('/lessons', GetAllComposer(Select.allLessons, 'select all lessons'))
router.get('/lesson/:id', GetByIdComposer(Select.oneLesson, 'select lesson'))
router.get('/lesson/:id/phrases', GetAllComposer(Select.fromLessonPhrases, 'select all lesson phrases'))

router.post('/lesson', PostComposer(Insert.intoLessons, 'insert lesson'))
router.post('/lesson/:lessonId/phrase', PostByParamsComposer(Insert.intoLessonPhrases, 'insert into lesson phrases'))

router.put('/lesson/:id', UpdateByIdComposer(Update.lesson, 'update lesson'))
router.put('/lesson/:lessonId/phrase/:phraseId/:viewOrder', UpdateByIdComposer(Update.lessonPhraseViewOrder, 'update lesson phrase view order'))

router.delete('/lesson/:id', DeleteByIdComposer(Delete.lesson, 'delete lesson'))
router.delete('/lesson/:lessonId/phrase/:phraseId', DeleteByIdComposer(Delete.fromLessonPhrases, 'delete phrase from lesson phrases'))

export default router
