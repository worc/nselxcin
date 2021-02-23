import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestPhrases } from './Actions/PhraseActions';
import Phrase from './Phrase';

class PhraseList extends React.Component {
    componentDidMount() {
        this.props.dispatch(requestPhrases(this.props.lessonId));
    }

    render() {
        return <div>
            { this.props.phrases.map(phrase => (
                <Phrase key={phrase.id} {...phrase} />
            ))}
        </div>
    }
}

PhraseList.propTypes = {
    // parent lessonId is required otherwise there's no way to get the phrases
    lessonId: PropTypes.number.isRequired,
    phrases: PropTypes.arrayOf(
        PropTypes.shape({
            // id and viewOrder are required because the database should be generating
            // default primary keys and a default viewOrder of 0, other fields are not
            // to accommodate adding and editing PhraseLists
            id: PropTypes.number.isRequired,
            salish: PropTypes.string,
            english: PropTypes.string,
            audioUrl: PropTypes.string,
            viewOrder: PropTypes.number.isRequired
        })
    )
};

const mapStateToProps = (state, ownProps) => {
    console.log('phrase list state to map', state);
    return {
        // lessons (and workbooks) are saved at the root level of state
        // as dictionaries with the lesson (and workbook) ids as the keys
        phrases: state.lessons[ownProps.lessonId].phrases
    }
};

export default connect(mapStateToProps)(PhraseList);
