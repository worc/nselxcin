import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Admin from './admin/app.js'

export default function () {
  return (
    <>
      <Switch>
        <Route
          path='/admin'
          render={( { match: { url }} ) => (
            <Admin path={ url }/>
          )}
        />
      </Switch>
    </>
  )
}