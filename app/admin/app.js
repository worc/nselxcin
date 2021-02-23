import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createGlobalStyle } from 'styled-components'
import { Link, Switch, Route } from 'react-router-dom'

import Phrases from './phrases.js'
import WorkbookForm from './workbook_form.js'
import Workbook from './workbook.js'
import BulkUpload from './bulk_upload.js'
import Orphans from './orphans.js'

function testDelete(workbook_id) {
  return axios.delete(`/api/workbook/${workbook_id}`).then(res => console.log(res)).catch(err => console.error(err))
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`

export default function ({ path = '/admin' }) {
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

      <Switch>
        <Route exact path={`${path}`} render={() => (
          <div>
            <WorkbookForm onUpdate={() => setLastUpdate(new Date())}/>
            <h3>workbooksssss</h3>
            <div>
          { workbooks.map(workbook => (
            <li id={`workbook_id_${workbook.workbook_id}`} key={workbook.workbook_id}>
              <div><Link to={`${path}/workbook/${workbook.workbook_id}`}>{ workbook.title }</Link></div>
              <div>{ workbook.subtitle }</div>
              <div>{ workbook.authors }</div>
              <div>{ workbook.edition }</div>
              <div>{ workbook.version }</div>
              <div style={{ border: '2px solid red'}} onClick={() => request(() => testDelete(workbook.workbook_id))}>DELETE</div>
            </li>
            ))}
            </div>
          </div>
        )}/>
        <Route path={`${path}/workbook/:id`} component={Workbook}/>
        <Route exact path={`${path}/phrases`} component={Phrases}/>
        <Route path={`${path}/phrases/bulk`} component={BulkUpload}/>
        <Route path={`${path}/audio/orphans`} component={ Orphans } />
      </Switch>
    </div>
  )
}
