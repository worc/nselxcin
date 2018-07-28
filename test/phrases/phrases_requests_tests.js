import { assert } from 'chai'

import {
    addPhrase,
    changePhrase,
    getPhrase,
    getPhrases,
    removePhrase
} from '../../src/features/phrases/phrases_requests'

global.API_ENDPOINT = 'http://localhost:8080'

describe('phrases integration tests', () => {
    describe('addPhrase', () => {
        it('adds english, salish, and audioURL phrase block', () => {
            return addPhrase('english', 'salish', 'url').then(response => {
                assert.isTrue(response !== undefined)
            }).catch(() => {
                assert.isTrue(false, 'rejected promise')
            })
        })

        it('adding a phrase returns the phrase object with id', () => {
            return addPhrase('english', 'salish', 'url').then(response => {
                assert.isTrue(response.data.id !== undefined)
                assert.isTrue(response.data.english === 'english')
                assert.isTrue(response.data.salish === 'salish')
                assert.isTrue(response.data.audioUrl === 'url')
            })
        })
    })

    describe('getPhrases', () => {
        it('returns all phrases in the database as an array', () => {
            return getPhrases().then(response => {
                assert.isTrue(Array.isArray(response.data))
            })
        })
    })

    describe('getPhrase', () => {
        it('returns a phrase object by id', () => {
            const nonce = new Date().getTime()
            const english = `english-${ nonce }`
            const salish = `salish-${ nonce }`
            const url = `url-${ nonce }`

            return addPhrase(english, salish, url).then(response => {
                const id = response.data.id

                return getPhrase(id).then(response => {
                    assert.isTrue(response.data.id === id)
                    assert.isTrue(response.data.english === english)
                    assert.isTrue(response.data.salish === salish)
                    assert.isTrue(response.data.audioUrl === url)
                })
            })
        })
    })

    describe('removePhrase', () => {
        it('removes a phrase by id', () => {
            const nonce = new Date().getTime()
            const english = `english-${ nonce }`
            const salish = `salish-${ nonce }`
            const url = `url-${ nonce }`

            return addPhrase(english, salish, url).then(response => {
                const id = response.data.id

                return removePhrase(id).then(() => {
                    return getPhrases().then(response => {
                        assert.isTrue(response.data.filter(phrase => phrase.id === id).length === 0)
                    })
                })
            })
        })
    })

    describe('changePhrase', () => {
        it('changes any part of the phrase except the id', () => {
            const nonce = new Date().getTime()
            const english = `english-${ nonce }`
            const salish = `salish-${ nonce }`
            const url = `url-${ nonce }`

            return addPhrase(english, salish, url).then(response => {
                const id = response.data.id
                const testEnglish = 'testEnglish'
                const testSalish = 'testSalish'
                const testUrl = 'testUrl'

                return changePhrase(id, testEnglish, testSalish, testUrl).then(response => {
                    assert.isTrue(response.data.id === id)
                    assert.isTrue(response.data.english === testEnglish)
                    assert.isTrue(response.data.salish === testSalish)
                    assert.isTrue(response.data.audioUrl === testUrl)
                })
            })
        })
    })
})
