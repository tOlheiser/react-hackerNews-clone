import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import { getMainFeed } from './api.js';

function Nav(props) {
    return (
        <div>
            <h1>Nav Bar</h1><br></br>
        </div>
    );
}

class Feed extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            repos: null
        };
    }

    componentDidMount() {
        getMainFeed()
            .then(repos => this.setState({
                repos: repos
            }))
    }

    render() {
        const { repos } = this.state;
        return (
            <React.Fragment>
            {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </React.Fragment>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <Feed />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// Write some functions in the api sheet.
// Read up on how to pull said functions with modules.
// Figure out how I should display the api data. 
// Pretty sure I don't need to track state in the Feed. 

//{repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
// he updated state to include the repos