import React from 'react'
import axios from 'axios'
import Input from '../components/input.js'

export default function () {
  function handleSubmit (e) {
    e.preventDefault()

    console.log(e.target.query.value)

    axios.get(`/api/search/phrases?q=${e.target.query.value}`).then(res => {
      console.log(res.data)
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
    </>
  )
}
