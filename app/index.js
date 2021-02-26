import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'

import Admin from './admin/app.js'
import Search from './search/app.js'
import Navigation from '../components/navigation.js'
import Footer from '../components/footer.js'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  max-width: 1600px;
  padding: 8px;

  & footer {
    flex: 0 0 auto;
    justify-self: flex-end;
  }
`

const Main = styled.main`
  display: flex;
  flex: 1 0 auto;
  flex-flow: row nowrap;
  
  & section {
    flex: 1 0 auto;
  }

  & nav {
    flex: 0 0 215px;
  }
`

export default function () {
  return (
    <>
      <GlobalStyles/>
      <Layout>
        <Main>
          <section>
            <Switch>
              <Route
                path='/admin'
                render={( { match: { url }} ) => (
                  <Admin path={ url }/>
                )}
              />
              <Route path='/search' component={ Search }/>
            </Switch>
          </section>
          <Navigation/>
        </Main>
        <Footer/>
      </Layout>
    </>
  )
}
