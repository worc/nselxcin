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
    font-family: "Aboriginal Sans", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  
  ul, ol {
    list-style-type: none;
  }

  .salish {
    color: #2fb6d4;
  }
`

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  max-width: 1600px;

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
    padding: 8px;
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
