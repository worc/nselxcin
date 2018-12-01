import React from 'react'
import { storiesOf } from '@storybook/react'
import Workbook from './Workbook'

const props = {
    title: 'test workbook',
    subtitle: `a dev's attempt at workbooking`,
    authors: ['worc', 'no one else'],
    version: 'like 0th version',
    edition: '1st edition',
}

storiesOf('Workbook', module)
    .add('hello world', () => <Workbook { ...props }/>)
