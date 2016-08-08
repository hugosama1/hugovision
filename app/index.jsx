import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main.jsx';
require("./main.css");
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (   
		  <MuiThemeProvider>
		  	<Main/>
		  </MuiThemeProvider>
        );
    } 
}

ReactDom.render(<App/>,document.getElementById('app'));