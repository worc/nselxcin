import React from 'react'
import styled from 'styled-components'

export default ({ salish, english, url }) => (
    <PhraseRow>
        <StyledDiv>{ salish }</StyledDiv>
        <StyledDiv>{ english }</StyledDiv>
        <StyledDiv><audio controls src={ url }/></StyledDiv>
    </PhraseRow>
)

const PhraseRow = styled.div`
    border: 1px solid #bad;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`

const StyledDiv = styled.div`
    border: 1px solid #ace;
    flex: 0 0 auto;
`
