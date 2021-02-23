import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  align-items: center;
  border-top: 1px solid black;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 16px;
  padding-top: 8px;
`

export default function () {
  return (
    <StyledFooter>
      <a href='https://github.com/worc/nselxcin'>GitHub Repo</a>
      <a href='http://www.interiorsalish.com/'>Interior Salish Resources</a>
    </StyledFooter>
  )
}
