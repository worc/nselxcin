import React, { useState } from 'react'
import axios from 'axios'
import Input from '../../components/input.js'

export default function () {
  const [results, setResults] = useState([])

  function handleSubmit (e) {
    e.preventDefault()

    console.log(e.target.query.value)

    axios.get(`/api/search/phrases?q=${e.target.query.value}`).then(res => {
      console.log(res.data)
      setResults(res.data)
    }).catch(err => console.error(err))
  }

  return (
    <>
      <h1>phrase search</h1>
      <form id='search' onSubmit={ handleSubmit }>
        <Input
          id='query'
          label='Search'
          type='text'
        />
        <button>submit</button>
      </form>
      <hr/>
      <ol>
        { results.map(result => (
          <li key={result.phrase_id}>
            <div>{ result.english }</div>
            <div>{ result.salish }</div>
            <audio controls src={`/api/audio/${result.audio_id}`}/>
          </li>
        ))}
      </ol>
    </>
  )
}
