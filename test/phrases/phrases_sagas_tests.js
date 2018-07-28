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
            status: 200,
            statusText: 'OK',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8',
                'User-Agent': 'axios/0.18.0',
                'Content-Length': 56
            },
            method: 'post',
            url: 'http://localhost:8080/api/phrase',
            data: {
                id: 231,
                english: 'english',
                salish: 'salish',
                audioUrl: 'url'
            }
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
                put({ type: action.RECEIVE_PHRASE, phrase: mockResponse.data })
            )
        })
    })

    describe('getPhrases', () => {
        const mockResponse = {
            status: 200,
            statusText: 'OK',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json;charset=utf-8',
                'User-Agent': 'axios/0.18.0',
                'Content-Length': 56
            },
            method: 'post',
            url: 'http://localhost:8080/api/phrase',
            data: [
                {
                    id: 231,
                    english: 'english',
                    salish: 'salish',
                    audioUrl: 'url'
                },
                {
                    id: 232,
                    english: 'ingles',
                    salish: 'salis',
                    audioUrl: 'audioUrl'
                }
            ]
        }

        before(() => {
            sinon.stub(api, 'getPhrases').callsFake(() => mockResponse)
        })

        after(() => {
            api.getPhrases.reset()
        })

        it('gets an array of phrases and dispatches them', () => {
            const gen = sagas.getPhrases()

            assert.deepEqual(
                gen.next().value,
                call(api.getPhrases)
            )

            assert.deepEqual(
                gen.next(mockResponse).value,
                put({ type: action.RECEIVE_PHRASES, phraseList: mockResponse.data })
            )
        })
    })
})
