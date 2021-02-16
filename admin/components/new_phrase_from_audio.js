import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Input from '../../components/input.js'

export default function ({ audio_id }) {
  const [phraseId, setPhraseId] = useState('')
  const [phrase, setPhrase] = useState({})
  const [metadata, setMetadata] = useState({})
  const [mode, setMode] = useState('edit') // or committed

  useEffect(() => {
    axios.post('/api/phrase', {
      salish: '',
      english: '',
    }).then(response => {
      setPhraseId(response.data.phrase_id)
      axios.put(`/api/phrase/${response.data.phrase_id}/audio/${audio_id}`).then(response => {
        console.log(`phrase and audio linked`, response.data)
      })
    })
  }, [])

  useEffect(() => {
    axios.get(`/api/audio/${audio_id}/metadata`).then(response => {
      setMetadata(response.data)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/phrase/${phraseId}`, {
      salish: e.target.salish.value,
      english: e.target.english.value,
    }).then(response => {
      setPhrase({
        salish: response.data.salish,
        english: response.data.english,
      })
      setMode('committed')
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
          <div>{ metadata.filename }, { metadata.size }</div>
          <button>COMMIT CHANGES</button>
        </form>
    )
    : (
      <div>
        <div>{ phrase.salish }</div>
        <div>{ phrase.english }</div>
        <audio controls src={ `/api/audio/${audio_id}` }/>
        <div>{ metadata.filename }, { metadata.size }</div>
        <button onClick={() => setMode('edit')}>EDIT</button>
      </div>
    )
  )
}
