import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import PhraseList from './PhraseList';

const Lesson = ({ lessonName, lessonNumber, phrases, folded }) => (
    <React.Fragment>
        <LessonHeader>
            <h3>smy̓may̓ { lessonNumber }</h3>
            <h3>{ lessonName }</h3>
        </LessonHeader>
        <LessonBody className={ folded ? 'folded' : null}>
            <PhraseList phrases={ phrases }/>
        </LessonBody>
    </React.Fragment>
);

Lesson.propTypes = {
    lessonId: PropTypes.string.required,
};

export default Lesson;

const LessonHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`

const LessonBody = styled.div`
    height: initial;
    overflow: hidden;
    
    &.folded {
        height: 0;
    }
`
