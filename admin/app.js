import React, { useEffect, useState } from 'react'
import axios from 'axios'

function testPost() {
  console.log('posting... hopefully...')
  axios.post('/api/workbook', {
    title: 'title',
    subtitle: 'subtitle',
    authors: 'just a plain string',
    edition: 'edition',
    version: 'version number',
  }).then(res => console.log(res)).catch(err => console.error(err))
}

function testDelete(workbook_id) {
  console.log('deleting...')
  axios.delete(`/api/workbook/${workbook_id}`).then(res => console.log(res)).catch(err => console.error(err))
}

export default function () {
  const [workbooks, setWorkbooks] = useState([])

  useEffect(() => {
    axios.get('/api/workbooks').then(response => {
      console.log(response)
      setWorkbooks(response.data)
    })
  }, [])

  return (
    <div>
      <h1>hello world</h1>
      <div style={{border: '1px solid #ace'}} onClick={testPost}>test post request</div>
      <div>
        { workbooks.map(workbook => (
          <li key={workbook.workbook_id}>
            <div>{ workbook.title }</div>
            <div>{ workbook.subtitle }</div>
            <div>{ workbook.authors }</div>
            <div>{ workbook.edition }</div>
            <div>{ workbook.version }</div>
            <div style={{ border: '2px solid red'}} onClick={() => testDelete(workbook.workbook_id)}>DELETE</div>
          </li>
        ))}
      </div>
    </div>
  )
}
