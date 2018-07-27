import { assert } from 'chai'

import {addPhrase, getPhrase, getPhrases } from '../../src/features/phrases/phrases_requests'

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
                assert.isTrue(response.id !== undefined)
                assert.isTrue(response.english === 'english')
                assert.isTrue(response.salish === 'salish')
                assert.isTrue(response.audioUrl === 'url')
            })
        })
    })

    describe('getPhrases', () => {
        it('returns all phrases in the database as an array', () => {
            return getPhrases().then(response => {
                assert.isTrue(Array.isArray(response))
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
                const id = response.id

                return getPhrase(id).then(response => {
                    assert.isTrue(response.id === id)
                    assert.isTrue(response.english === english)
                    assert.isTrue(response.salish === salish)
                    assert.isTrue(response.audioUrl === url)
                })
            })
        })
    })
})
