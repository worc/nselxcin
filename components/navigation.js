import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const StyledNav = styled.nav`
  margin-left: 8px;
  
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  ul ul {
    margin-inline-start: 24px;
  }
  
  a {
    color: #2fb6d4;
    display: block;
    padding: 4px;
    text-decoration: none;
  }
  
  a.selected {
    background-color: #2fb6d4;
    color: white;
  }
`

export default function () {
  return (
    <StyledNav>
      <ul>
        <li>
          <NavLink exact to='/admin' activeClassName='selected'>Admin</NavLink>
          <ul>
            <li><NavLink exact to='/admin/phrases' activeClassName='selected'>Phrases</NavLink></li>
            <li><NavLink to='/admin/phrases/bulk' activeClassName='selected'>Bulk Phrase Upload</NavLink></li>
            <li><NavLink to='/admin/audio/orphans' activeClassName='selected'>Orphaned Audio</NavLink></li>
          </ul>
        </li>
        <li><NavLink to='/search' activeClassName='selected'>Search</NavLink></li>
      </ul>
    </StyledNav>
  )
}
