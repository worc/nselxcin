import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Input from '../../components/input.js'

const StyledResults = styled.ol`
  li {
    margin: 8px 0;
  }
`

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
      <StyledResults>
        { results.map(result => (
          <li key={result.phrase_id}>
            <div>{ result.english }</div>
            <div className={'salish'}>{ result.salish }</div>
            <audio preload='metadata' controls src={`/api/audio/${result.audio_id}`}/>
          </li>
        ))}
      </StyledResults>
    </>
  )
}
