import React from 'react';

export default class Workbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salish: '',
            english: '',
            audioUrl: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form onChange={ this.onChangeHandler }>
                <input name="salish" value={ this.state.salish } />
                <input name="english" value={ this.state.english } />
                <input name="audioUrl" value={ this.state.audioUrl } />
            </form>
        )
    }
}

Workbook.defaultProps = {
    folded: true
};
