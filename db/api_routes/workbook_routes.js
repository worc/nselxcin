import express from 'express'

import {
    DeleteByIdComposer,
    DeleteByParamsComposer,
    GetAllComposer,
    GetByIdComposer,
    PostByParamsComposer,
    PostComposer,
    UpdateByIdComposer,
    UpdateByParamsComposer
} from '../api'

import Select from '../transactions/Select'
import Insert from '../transactions/Insert'
import Delete from '../transactions/Delete'
import Update from '../transactions/Update'

const router = express.Router()

router.get('/workbook/:id', GetByIdComposer(Select.oneFromWorkbooks, 'select workbook'))
router.get('/workbooks', GetAllComposer(Select.allWorkbooks, 'select workbooks'))

router.post('/workbook', PostComposer(Insert.intoWorkbooks, 'insert workbook'))

router.put('/workbook/:id', UpdateByIdComposer(Update.workbook, 'update workbook'))

router.delete('/workbook/:id', DeleteByIdComposer(Delete.workbook, 'delete workbook'))

export default router
