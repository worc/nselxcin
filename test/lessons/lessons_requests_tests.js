import { assert } from 'chai'

import {
    addLesson,
    addPhraseToLesson,
    getLesson,
    getLessons,
    getLessonPhrases,
    editLesson,
    editLessonPhraseViewOrder,
    deleteLesson,
    removePhraseFromLesson
} from '../../src/features/lessons/lessons_requests'

import {
    addPhrase,
    getPhrase
} from '../../src/features/phrases/phrases_requests'

global.API_ENDPOINT = 'http://localhost:8080'

describe('lesson requests', () => {
    describe('addLesson', () => {
        it('adding a lesson returns a response with lesson data and id', () => {
            return addLesson('testName').then(response => {
                assert.isTrue(response.data.id !== undefined)
                assert.isTrue(response.data.lessonName === 'testName')
            })
        })
    })

    describe('addPhraseToLesson', () => {
        it('associates an existing phrase with a lesson', () => {
            const nonce = new Date().getTime()
            const viewOrder = 5

            const lessonName = `lessonName-${ nonce }`
            const lessonNumber = nonce

            const english = `english-${ nonce }`
            const salish = `salish-${ nonce }`
            const url = `url-${ nonce }`

            return addLesson(lessonName, lessonNumber).then(response => {
                const lessonId = response.data.id

                return addPhrase(english, salish, url).then(response => {
                    const phraseId = response.data.id

                    return addPhraseToLesson(phraseId, lessonId, viewOrder).then(response => {
                        assert.deepEqual(
                            response.data,
                            {
                                id: response.data.id,
                                phraseId,
                                viewOrder
                            }
                        )
                    })
                })
            })
        })
    })

    describe('getLesson', () => {
        it('returns a lesson response by id', () => {
            const nonce = new Date().getTime()
            const lessonName = `lessonName-${ nonce }`

            return addLesson(lessonName, nonce).then(response => {
                const lessonId = response.data.id

                return getLesson(lessonId).then(response => {
                    assert.deepEqual(
                        response.data,
                        {
                            id: lessonId,
                            lessonName: lessonName,
                        }
                    )
                })
            })
        })
    })

    describe('getLessons', () => {
        it('returns all lessons as an array', () => {
            return getLessons().then(response => {
                assert.isTrue(Array.isArray(response.data))
            })
        })
    })

    describe('getLessonPhrases', () => {
        it('gets all of the lesson phrases as an array', () => {
            const nonce = new Date().getTime()

            const lessonName = `lessonName-${ nonce }`

            const english = `english-${ nonce }`
            const salish = `salish-${ nonce }`
            const url = `url-${ nonce }`

            return addLesson(lessonName).then(response => {
                const lessonId = response.data.id

                return addPhrase(english, salish, url).then(response => {
                    const phraseId = response.data.id

                    return addPhraseToLesson(phraseId, lessonId).then(() => {
                        return getLessonPhrases(lessonId).then(response => {
                            assert.isTrue(response.data.length === 1)
                        })

                    })
                })
            })
        })
    })

    describe('editLesson', () => {
        it('changes the name of the lesson', () => {
            const nonce = new Date().getTime()
            const lessonName = `lessonName-${ nonce }`

            return addLesson(lessonName).then(response => {
                const requestBody = {
                    id: response.data.id,
                    lessonName: 'testLesson'
                }

                return editLesson(requestBody).then(response => {
                    assert.deepEqual(
                        response.data,
                        requestBody
                    )
                })
            })
        })
    })

    describe('editLessonPhraseViewOrder', () => {
        it('updates the order of the phrase', () => {
            const nonce = new Date().getTime()
            const lessonName = `lessonName-${ nonce }`

            const english = `english-${ nonce }`
            const salish = `salish-${ nonce }`
            const url = `url-${ nonce }`

            return addLesson(lessonName).then(response => {
                const lessonId = response.data.id

                return addPhrase(english, salish, url).then(response => {
                    const phraseId = response.data.id

                    return addPhraseToLesson(phraseId, lessonId, 0).then(response => {
                        assert.isTrue(response.data.viewOrder === 0)

                        return editLessonPhraseViewOrder({ lessonId, phraseId, viewOrder: 5 }).then(response => {
                            assert.isTrue(response.data.viewOrder === 5)
                        })
                    })
                })
            })
        })
    })

    describe('deleteLesson', () => {
        it('removes a lesson from the database', () => {
            const nonce = new Date().getTime()
            const lessonName = `lessonName-${ nonce }`

            return addLesson(lessonName).then(response => {
                const lessonId = response.data.id

                return deleteLesson(lessonId).then(() => {
                    return getLessons().then(response => {
                        assert.isTrue(response.data.filter(lesson => lesson.id === lessonId).length === 0)
                    })
                })
            })
        })
    })

    describe('removePhraseFromLesson', () => {
        it('removes a phrase from a lesson, but does not delete the phrase', () => {
            const nonce = new Date().getTime()

            const lessonName = `lessonName-${ nonce }`

            const english = `english-${ nonce }`
            const salish = `salish-${ nonce }`
            const url = `url-${ nonce }`

            return addLesson(lessonName).then(response => {
                const lessonId = response.data.id

                return addPhrase(english, salish, url).then(response => {
                    const phraseId = response.data.id

                    return addPhraseToLesson(phraseId, lessonId).then(() => {
                        return removePhraseFromLesson(phraseId, lessonId).then(() => {
                            return getPhrase(phraseId).then(response => {
                                assert.deepEqual(
                                    response.data,
                                    {
                                        id: phraseId,
                                        english,
                                        salish,
                                        audioUrl: url
                                    }
                                )
                            })
                        })
                    })
                })
            })
        })
    })
})
