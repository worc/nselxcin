// TODO restrict upload input form to audio/mpeg only (mp3)

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Input from '../../components/input.js'

function handleSubmit(e, onUpdate) {
  e.preventDefault()

  // we're gonna need the file information from this event
  // after the first round-trip to the server, so we'll persist
  // the event and the data
  e.persist()

  axios.post('/api/phrase', {
    salish: e.target.salish.value,
    english: e.target.english.value
  }).then(res => {
    axios.put(`/api/phrase/${res.data.phrase_id}/audio`, e.target.salish_audio.files[0], {
      headers: {
        'Content-Type': 'audio/mpeg',
      }
    }).then(res => {
      onUpdate()
      console.log(res)
    }).catch(err => console.error(err))
  }).catch(err => console.error(err))
}

function handleDelete(id) {
  return axios.delete(`/api/phrase/${id}`).then(res => console.log(res)).catch(err => console.error(err))
}

function onUpdate() {
  console.log('updated')
}

export default function () {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [phrases, setPhrases] = useState([])

  useEffect(() => {
    axios.get('/api/phrases').then(res => {
      setPhrases(res.data)
    }).catch(err => console.error(err))
  }, [lastUpdate])

  return (
    <React.Fragment>
      <h1>New Phrase</h1>
        <form id='new-phrase' onSubmit={e => handleSubmit(e, () => setLastUpdate(new Date()))}>
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
          <Input
            id='salish_audio'
            required={ true }
            label='Salish Audio Sample'
            type='file'
          />
          <button>submit</button>
        </form>
      <h1>Phrases</h1>
      {
        phrases.map(phrase => (
          <li>
            <div className={'salish'}>{ phrase.salish }</div>
            <div>{ phrase.english }</div>
            <div>{ (phrase.size / 1024).toFixed(2)} KB</div>
            <audio controls src={ `/api/phrase/${phrase.phrase_id}/audio` }/>
            <span style={{ border: '2px solid red'}} onClick={e => {
              handleDelete(phrase.phrase_id).then(() => setLastUpdate(new Date()))
            }}>DELETE</span>
          </li>
        ))
      }
    </React.Fragment>
  )
}
