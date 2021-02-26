import React from 'react'
import axios from 'axios'
import Input from '../../components/input.js'

function handleSubmit (e, onUpdate) {
  e.preventDefault()
  const workbook = {
    title: e.target.title.value,
    subtitle: e.target.subtitle.value,
    authors: e.target.authors.value,
    edition: e.target.edition.value,
    version: e.target.version.value,
  }
  axios.post('/api/workbook', workbook).then(res => {
    console.log(res)
    onUpdate()
  }).catch(err => console.error(err))
}

export default function ({ onUpdate }) {
  return (
    <form id='new-workbook' onSubmit={e => handleSubmit(e, onUpdate)}>
      <h3>New Workbook:</h3>
      <Input
        id='title'
        required={ true }
        label='Title'
        type='text'
        placeholder='Nselxcin 1'
      />
      <Input
        id='subtitle'
        required={ true }
        label='Subtitle'
        type='text'
        placeholder='A Beginning Course in Colville-Okanagan Salish'
      />
      <Input
        id='authors'
        required={ true }
        label='Authors'
        type='text'
        placeholder='Sarah Peterson, LaRae Wiley, Christopher Parkin'
      />
      <Input
        id='edition'
        required={ true }
        label='Edition'
        type='text'
        placeholder='3rd'
      />
      <Input
        id='version'
        required={ true }
        label='Version'
        type='text'
        placeholder='3'
      />
      <button>submit</button>
    </form>
  )
}
