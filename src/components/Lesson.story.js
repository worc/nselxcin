import React from 'react'
import { storiesOf } from '@storybook/react'
import Lesson from './Lesson'

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

storiesOf('Lesson', module)
    .add('hello world', () => <Lesson lessonName={'lesson name'} lessonNumber={1} phrases={ phrases }/> )
    .add('folded lesson', () => <Lesson lessonName={'folded lesson'} lessonNumber={2} phrases={ phrases } folded={true}/>)
