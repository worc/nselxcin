import React from "react";
import Workbook from "./Workbook";

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
                <Workbook />
            </div>
        )
    }
}

export default App;
