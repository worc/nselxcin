import React from 'react'
import { storiesOf } from '@storybook/react'
import PhraseList from './PhraseList'

const phrases = [
    {
        salish: 'salish goes here',
        english: 'english translation',
        url: 'https://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3'
    }, {
        salish: 'more salish here',
        english: 'another english translation',
        url: 'https://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3'
    }
]

storiesOf('PhraseList', module)
    .add('hello world', () => <PhraseList phrases={ phrases } />)
