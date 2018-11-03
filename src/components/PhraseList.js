import React from 'react'

import Phrase from './Phrase'

export default ({ phrases }) => (
    <div>
        <h1>phrases</h1>
        <div>
            { phrases.map(phrase => <Phrase { ...phrase }/>) }
        </div>
    </div>
)
