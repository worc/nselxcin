import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createGlobalStyle } from 'styled-components'
import WorkbookForm from './workbook_form.js'

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

      <div>
        <h2>test inputs</h2>
        <WorkbookForm onUpdate={() => setLastUpdate(new Date())}/>
      </div>

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
    </div>
  )
}
