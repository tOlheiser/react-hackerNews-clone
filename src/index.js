// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import { ThemeProvider } from './contexts/theme';
import './reset.css';
import './index.css';

// Components
import Nav from './components/Nav';
import Loading from './components/Loading';
const Feed = React.lazy(() => import('./components/Feed'));
const User = React.lazy(() => import('./components/User'));
const Post = React.lazy(() => import('./components/Post'));

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
        return (
            <Router>
                <ThemeProvider value={ this.state }>
                    <div className={this.state.theme}>
                        <Nav /> 
                        <React.Suspense fallback={<Loading />}>
                            <Route exact path='/' component={Feed} />
                            <Route path='/new' component={Feed} />
                            <Route path='/user' component={User} />
                            <Route path='/post' component={Post}/>
                        </React.Suspense>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));