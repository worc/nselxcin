import React, { useState } from 'react'
import axios from 'axios'

import NewPhraseFromAudio from './components/new_phrase_from_audio.js'

export default function () {
  const [ids, setIds] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    const uploads = [ ...e.target.audio.files ].map(file => {
      return axios.post('/api/audio', file, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Filename': file.name
        }
      })
    })

    Promise.all(uploads).then(responses => {
      const ids = responses.map(response => response.data.audio_id)
      setIds(ids)
    })
  }

  return (
    <div>
      <div>
        <h1>Bulk Upload</h1>
        <form id='bulk_audio' onSubmit={handleSubmit}>
          <input id='audio' type='file' multiple />
          <button>submit</button>
        </form>
      </div>
      <div>
        <h1>Bulk Edit</h1>
        { ids.map(id => <NewPhraseFromAudio key={ id } audio_id={ id }/>)}
      </div>
    </div>
  )
}
