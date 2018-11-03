import React from 'react'
import { storiesOf } from '@storybook/react'
import Phrase from './Phrase'

storiesOf('Phrase', module)
    .add('hello world', () => <Phrase/>)
