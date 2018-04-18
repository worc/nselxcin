import React from "react";

class App extends React.Component{
    render() {
        return (
            <div style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexFlow: 'column nowrap',
                fontFamily: '"Lato", sans-serif',
                height: '100%',
                padding: '0 10px'
            }}>
                hello world
            </div>
        )
    }
}

export default App;
