import sinon from 'sinon'
import { assert } from 'chai'
import { call, put } from 'redux-saga/effects'

import * as sagas from '../../src/features/lessons/lessons_sagas'
import * as api from '../../src/features/lessons/lessons_requests'
import * as action from '../../src/features/lessons/lessons_actions'

const mockAddLessonResponse = {
    status: 200,
    statusText: 'OK',
    headers: {
        "x-powered-by": "Express",
        "content-type": "application/json; charset=utf-8",
        "content-length": "33",
        "etag": "W/\"21-B5C0snp/fOjIbJzHr87wmHVS/uk\"",
        "date": "Mon, 20 Aug 2018 01:05:40 GMT",
        "connection": "close"
    },
    method: 'post',
    data: {
        id: 67,
        lessonName: 'testName'
    }
}

const mockAddPhraseToLessonResponse = {
    headers: {
        "x-powered-by": "Express",
        "content-type": "application/json; charset=utf-8",
        "content-length": "38",
        "etag": "W/\"26-Ql6qAdWGLYQ4P5sAut6tQRrq96s\"",
        "date": "Mon, 20 Aug 2018 01:09:15 GMT",
        "connection": "close"
    },
    data: {
        "id": 28,
        "phraseId": 129,
        "viewOrder": 5
    }
}

const mockGetLessonResponse = {
    data: {
        "id": 69,
        "lessonName": "lessonName-1534727465423"
    }
}

const mockGetLessonsResponse = {
    data: [
        {
            "id": 1,
            "lessonName": "testName"
        },
        {
            "id": 2,
            "lessonName": "lessonName-1532753893999"
        },
        {
            "id": 3,
            "lessonName": "lessonName-1532753894468"
        },
        {
            "id": 4,
            "lessonName": "testName"
        },
        {
            "id": 5,
            "lessonName": "lessonName-1532753912486"
        },
        {
            "id": 6,
            "lessonName": "lessonName-1532753912925"
        },
        {
            "id": 7,
            "lessonName": "testName"
        },
        {
            "id": 8,
            "lessonName": "lessonName-1532754023469"
        },
        {
            "id": 9,
            "lessonName": "lessonName-1532754023966"
        },
        {
            "id": 10,
            "lessonName": "testName"
        },
        {
            "id": 11,
            "lessonName": "lessonName-1532754037532"
        },
        {
            "id": 12,
            "lessonName": "lessonName-1532754038019"
        },
        {
            "id": 13,
            "lessonName": "testName"
        },
        {
            "id": 14,
            "lessonName": "lessonName-1532754476216"
        },
        {
            "id": 15,
            "lessonName": "lessonName-1532754476674"
        },
        {
            "id": 16,
            "lessonName": "lessonName-1532754476851"
        },
        {
            "id": 17,
            "lessonName": "testName"
        },
        {
            "id": 18,
            "lessonName": "lessonName-1532754695727"
        },
        {
            "id": 19,
            "lessonName": "lessonName-1532754696241"
        },
        {
            "id": 20,
            "lessonName": "lessonName-1532754696413"
        },
        {
            "id": 21,
            "lessonName": "testName"
        },
        {
            "id": 22,
            "lessonName": "lessonName-1532754718612"
        },
        {
            "id": 23,
            "lessonName": "lessonName-1532754719213"
        },
        {
            "id": 24,
            "lessonName": "lessonName-1532754719387"
        },
        {
            "id": 25,
            "lessonName": "testName"
        },
        {
            "id": 26,
            "lessonName": "lessonName-1532797406956"
        },
        {
            "id": 27,
            "lessonName": "lessonName-1532797407514"
        },
        {
            "id": 28,
            "lessonName": "lessonName-1532797407654"
        },
        {
            "id": 29,
            "lessonName": "testLesson"
        },
        {
            "id": 30,
            "lessonName": "testName"
        },
        {
            "id": 31,
            "lessonName": "lessonName-1532797931979"
        },
        {
            "id": 32,
            "lessonName": "lessonName-1532797932484"
        },
        {
            "id": 33,
            "lessonName": "lessonName-1532797932647"
        },
        {
            "id": 34,
            "lessonName": "testLesson"
        },
        {
            "id": 35,
            "lessonName": "lessonName-1532797933409"
        },
        {
            "id": 36,
            "lessonName": "testName"
        },
        {
            "id": 37,
            "lessonName": "lessonName-1532798125777"
        },
        {
            "id": 38,
            "lessonName": "lessonName-1532798126257"
        },
        {
            "id": 39,
            "lessonName": "lessonName-1532798126431"
        },
        {
            "id": 40,
            "lessonName": "testLesson"
        },
        {
            "id": 41,
            "lessonName": "lessonName-1532798127227"
        },
        {
            "id": 43,
            "lessonName": "testName"
        },
        {
            "id": 44,
            "lessonName": "lessonName-1532798667298"
        },
        {
            "id": 45,
            "lessonName": "lessonName-1532798667832"
        },
        {
            "id": 46,
            "lessonName": "lessonName-1532798668026"
        },
        {
            "id": 47,
            "lessonName": "testLesson"
        },
        {
            "id": 48,
            "lessonName": "lessonName-1532798668875"
        },
        {
            "id": 50,
            "lessonName": "lessonName-1532798669927"
        },
        {
            "id": 51,
            "lessonName": "testName"
        },
        {
            "id": 52,
            "lessonName": "lessonName-1532798699890"
        },
        {
            "id": 53,
            "lessonName": "lessonName-1532798700415"
        },
        {
            "id": 54,
            "lessonName": "lessonName-1532798700579"
        },
        {
            "id": 55,
            "lessonName": "testLesson"
        },
        {
            "id": 56,
            "lessonName": "lessonName-1532798701385"
        },
        {
            "id": 58,
            "lessonName": "lessonName-1532798702191"
        },
        {
            "id": 59,
            "lessonName": "testName"
        },
        {
            "id": 60,
            "lessonName": "lessonName-1534726848905"
        },
        {
            "id": 61,
            "lessonName": "lessonName-1534726849493"
        },
        {
            "id": 62,
            "lessonName": "lessonName-1534726849662"
        },
        {
            "id": 63,
            "lessonName": "testLesson"
        },
        {
            "id": 64,
            "lessonName": "lessonName-1534726850409"
        },
        {
            "id": 66,
            "lessonName": "lessonName-1534726851627"
        },
        {
            "id": 67,
            "lessonName": "testName"
        },
        {
            "id": 68,
            "lessonName": "lessonName-1534727354612"
        },
        {
            "id": 69,
            "lessonName": "lessonName-1534727465423"
        }
    ]
}

const mockGetLessonPhrasesResponse = {
    data: [
        {
            "salish": "salish-1534727587908",
            "english": "english-1534727587908",
            "audioUrl": "url-1534727587908",
            "viewOrder": 0
        }
    ]
}

const mockEditLessonResponse = {
    data: {
        "id": 71,
        "lessonName": "testLesson"
    }
}

const mockEditLessonPhraseViewOrder = {
    data: {
        "id": 30,
        "viewOrder": 5
    }
}

const mockDeleteLessonResponse = {
    status: 200,
    statusText: 'OK',
    data: '',
    headers: {
        'content-length': '0'
    }
}

const mockRemovePhraseFromLessonResponse = {
    data: {
        id: 31
    }
}

describe('lessons sagas', () => {
    before(() => {
        sinon.stub(api, 'addLesson').callsFake(lessonName => ({ ...mockAddLessonResponse, data: { lessonName: lessonName } }) )
        sinon.stub(api, 'addPhraseToLesson').callsFake(() => mockAddPhraseToLessonResponse)
        sinon.stub(api, 'getLesson').callsFake(() => mockGetLessonResponse)
        sinon.stub(api, 'getLessons').callsFake(() => mockGetLessonsResponse)
        sinon.stub(api, 'getLessonPhrases').callsFake(() => mockGetLessonPhrasesResponse)
        sinon.stub(api, 'editLesson').callsFake(() => mockEditLessonResponse)
        sinon.stub(api, 'editLessonPhraseViewOrder').callsFake(() => mockEditLessonPhraseViewOrder)
        sinon.stub(api, 'deleteLesson').callsFake(() => mockDeleteLessonResponse)
        sinon.stub(api, 'removePhraseFromLesson').callsFake(() => mockRemovePhraseFromLessonResponse)
    })

    after(() => {
        api.addLesson.reset()
        api.addPhraseToLesson.reset()
        api.getLesson.reset()
        api.getLessons.reset()
        api.getLessonPhrases.reset()
        api.editLesson.reset()
        api.editLessonPhraseViewOrder.reset()
        api.deleteLesson.reset()
        api.removePhraseFromLesson.reset()
    })

    describe('addLesson saga', () => {
        it('calls the addLesson endpoint first', () => {
            const mockMessage = {
                lessonName: 'testLessonName'
            }

            const gen = sagas.addLesson(mockMessage)

            assert.deepEqual(
                gen.next().value,
                call(api.addLesson, mockMessage.lessonName)
            )
        })

        it('dispatches the new lesson with its name and assigned id', () => {
            const mockMessage = {
                lessonName: 'testLessonName'
            }

            const gen = sagas.addLesson(mockMessage)
            gen.next()
            assert.deepEqual(
                gen.next(mockAddLessonResponse).value,
                put({ type: action.RECEIVE_LESSON, lesson: mockAddLessonResponse.data })
            )
        })
    })
})
