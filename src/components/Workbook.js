import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Workbook = ({ title, subtitle, authors, version, edition }) => (
    <Container>
        <WorkbookHeader>
            <div>{ title }</div>
            <div>{ subtitle }</div>
        </WorkbookHeader>

        <Content>content goes here</Content>

        <WorkbookFooter>
            <Authors>{ authors.join(', ') }</Authors>
            <Versioning>{ version }, { edition }</Versioning>
        </WorkbookFooter>
    </Container>
)

Workbook.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    version: PropTypes.string,
    edition: PropTypes.string,
}

export default Workbook

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    min-height: 100%;
`

const WorkbookHeader = styled.div`
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
`

const Content = styled.div`
    flex: 1 0 auto;
`

const WorkbookFooter = styled.div`
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
`

const Authors = styled.div`
    
`

const Versioning = styled.div`
`
