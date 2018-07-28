import React from 'react';
import PropTypes from 'prop-types';

const Phrase = ({ salish, english, audioUrl, viewOrder }) => (
    <div data-viewOrder={ viewOrder }>
        <span>{ salish }</span>
        <span>{ english }</span>
        <audio src={ audioUrl } controls />
    </div>
);

Phrase.propTypes = {
    salish: PropTypes.string,
    english: PropTypes.string,
    audioUrl: PropTypes.string
};

export default Phrase;
