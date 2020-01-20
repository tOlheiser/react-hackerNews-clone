// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import './reset.css';
import './index.css';
import { ThemeProvider } from './contexts/theme';

// Components
import Nav from './components/Nav';
import Feed from './components/Feed';
import User from './components/User';
import Post from './components/Post';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        };    
    }

    render() {
        const darkBody = {
            backgroundColor: "#1C2022",
        }

        const lightBody = {
            backgroundColor: "white",
        }

        return (
            <Router>
                <ThemeProvider value={ this.state }>
                    <div className={`bg-${}`} >
                        <Nav 
                            toggleStyles={this.toggleStyles}
                            style={this.state.style}
                        /> 
                        
                        <Route exact path='/' component={Feed} />
                        <Route path='/new' component={Feed} />
                        <Route path='/user' component={User} />
                        <Route path='/post' component={Post}/>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));