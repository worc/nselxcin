import express from 'express'

import {
    DeleteByIdComposer,
    GetAllComposer,
    GetByIdComposer,
    PostComposer,
    UpdateByIdComposer
} from '../transactions/_transaction_composers'

import Select from '../transactions/Select'
import Insert from '../transactions/Insert'
import Delete from '../transactions/Delete'
import Update from '../transactions/Update'

const router = express.Router()

router.get('/phrases', GetAllComposer(Select.allPhrases, 'select all phrases'))
router.get('/phrase/:id', GetByIdComposer(Select.oneFromPhrases, 'select phrase by id'))

router.post('/phrase', PostComposer(Insert.intoPhrases, 'insert phrase'));

router.put('/phrase/:id', UpdateByIdComposer(Update.phrase, 'update phrase'));

router.delete('/phrase/:id', DeleteByIdComposer(Delete.phrase, 'delete phrase'));

export default router
