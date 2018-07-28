// import { describe, beforeEach, afterEach, it } from 'mocha'
import { assert } from 'chai'
import sinon from 'sinon'
import { call, put, all } from 'redux-saga/effects'

import * as sagas from '../../src/features/phrases/phrases_sagas'
import * as api from '../../src/features/phrases/phrases_requests'

describe('phrases sagas', () => {
    describe('addPhrase saga', () => {
        beforeEach(() => {
            sinon.stub(api, 'addPhrase').callsFake(() => {
                return {
                    id: 0,
                    english: 'english',
                    salish: 'salish',
                    audioUrl: 'url'
                }
            })
        })

        afterEach(() => {
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
    })
})
