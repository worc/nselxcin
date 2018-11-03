import React from 'react'
import { storiesOf } from '@storybook/react'
import Phrase from './Phrase'

const testProps = {
    salish: 'salish goes here',
    english: 'english translation',
    url: 'https://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3'
}

storiesOf('Phrase', module)
    .add('hello world', () => <Phrase { ...testProps } />)
