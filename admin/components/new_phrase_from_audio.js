import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Input from '../../components/input.js'

export default function (audio_id) {
  const [phraseId, setPhraseId] = useState('')
  const [phrase, setPhrase] = useState({})
  const [mode, setMode] = useState('edit') // or committed

  useEffect(() => {
    axios.post('/api/phrase', {
      salish: '',
      english: '',
      audio_id: audio_id,
    }).then(response => {
      setPhraseId(response.data.phrase_id)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    // todo Reply from server with data instead of persisting client-side
    e.persist()

    axios.put(`/api/phrase/${phraseId}`, {
      salish: e.target.salish.value,
      english: e.target.english.value,
    }).then(response => {
      console.log({ response })
      setPhrase({
        salish: e.target.salish.value,
        english: e.target.english.value,
      })
    })
  }

  return (
    mode === 'edit'
    ? (
        <form id={phraseId} onSubmit={handleSubmit}>
          <Input
            id='salish'
            required={ true }
            label='Salish'
            type='text'
            placeholder={ 'way' }
          />
          <Input
            id='english'
            required={ true }
            label='English'
            type='text'
            placeholder={ 'Hello' }
          />
          <audio controls src={ `/api/audio/${audio_id}` }/>
          <button>COMMIT CHANGES</button>
        </form>
    )
    : (
      <div>
        <div>{ phrase.salish }</div>
        <div>{ phrase.english }</div>
        <audio controls src={ `/api/audio/${audio_id}` }/>
        <button onClick={() => setMode('edit')}>EDIT</button>
      </div>
    )
  )
}
