// import { describe, beforeEach, afterEach, it } from 'mocha'
import { assert } from 'chai'
import sinon from 'sinon'
import { call, put, all } from 'redux-saga/effects'

import * as sagas from '../../src/features/phrases/phrases_sagas'
import * as api from '../../src/features/phrases/phrases_requests'
import * as action from '../../src/features/phrases/phrases_actions'

describe('phrases sagas', () => {
    describe('addPhrase saga', () => {
        const mockResponse = {
            id: 0,
            english: 'english',
            salish: 'salish',
            audioUrl: 'url'
        }

        before(() => {
            sinon.stub(api, 'addPhrase').callsFake(() => mockResponse)
        })

        after(() => {
            api.addPhrase.reset()
        })

        it('it calls the addPhrase endpoint first', () => {
            const mockMessage = {
                english: 'english',
                salish: 'salish',
                audioUrl: 'audioUrl'
            }

            const gen = sagas.addPhrase(mockMessage)

            assert.deepEqual(
                gen.next().value,
                call(api.addPhrase, mockMessage.english, mockMessage.salish, mockMessage.audioUrl)
            )
        })

        it('dispatches the new phrase with the phrase id', () => {
            const mockMessage = {
                english: 'english',
                salish: 'salish',
                audioUrl: 'audioUrl'
            }

            const gen = sagas.addPhrase(mockMessage)

            gen.next()

            assert.deepEqual(
                gen.next(mockResponse).value,
                put({ type: action.RECEIVE_PHRASE, phrase: mockResponse })
            )
        })
    })
})
