import React from 'react'
import styled from 'styled-components'

const Guidance = ({ pristine, errors, suggestions }) => (
  <Container>
    <Errors reveal={!pristine && errors}>{errors}</Errors>
    <Reveal reveal={!pristine && suggestions}>{suggestions}</Reveal>
  </Container>
)

export default Guidance

const Container = styled.div`
  font-size: 12px;
`

const Reveal = styled.div`
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  height: ${props => (props.reveal ? '16px' : '0')};
`

const Errors = styled(Reveal)`
  color: #c93c34;
`
