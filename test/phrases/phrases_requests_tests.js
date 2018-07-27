import { assert } from 'chai'

import { addPhrase } from '../../src/features/phrases/phrases_requests'

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

    // describe('')
})
