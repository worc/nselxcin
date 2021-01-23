import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createGlobalStyle } from 'styled-components'
import Input from '../components/input.js'

function testPost() {
  return axios.post('/api/workbook', {
    title: 'title',
    subtitle: 'subtitle',
    authors: 'just a plain string',
    edition: 'edition',
    version: 'version number',
  }).then(res => console.log(res)).catch(err => console.error(err))
}

function testDelete(workbook_id) {
  return axios.delete(`/api/workbook/${workbook_id}`).then(res => console.log(res)).catch(err => console.error(err))
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

export default function () {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [workbooks, setWorkbooks] = useState([])

  useEffect(() => {
    axios.get('/api/workbooks').then(response => {
      console.log(response)
      setWorkbooks(response.data)
    })
  }, [lastUpdate])

  function request(promise) {
    promise().then(setLastUpdate(new Date()))
  }

  return (
    <div>
      <GlobalStyle/>
      <h1>hello world</h1>
      <div style={{border: '1px solid #ace'}} onClick={() => request(testPost)}>test post request</div>
      <div>
        { workbooks.map(workbook => (
          <li key={workbook.workbook_id}>
            <div>{ workbook.title }</div>
            <div>{ workbook.subtitle }</div>
            <div>{ workbook.authors }</div>
            <div>{ workbook.edition }</div>
            <div>{ workbook.version }</div>
            <div style={{ border: '2px solid red'}} onClick={() => request(() => testDelete(workbook.workbook_id))}>DELETE</div>
          </li>
        ))}
      </div>
      <div>
        <h2>test inputs</h2>
        <form id='new-workbook'>
          <Input
            id='title'
            required={ true }
            label='Workbook Title'
            type='Text'
            placeholder='Nselxcin 1'
          />
        </form>
      </div>
    </div>
  )
}
