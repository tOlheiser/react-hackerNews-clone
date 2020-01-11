import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import { getMainFeed } from './api.js';

function Nav(props) {
    return (
            <div className="container">
                <ul className="flex between row container-sm clear">
                    <div className="flex">
                        <li className="nav-font">Top</li>
                        <li className="nav-font">New</li>
                    </div>
                    <div className="flex">
                        <li className="nav-font">Styles</li>
                    </div>
                </ul><br></br>
            </div>
    );
}

class Feed extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            repos: null,
            mounted: false
        };
    }

    componentDidMount() {
        getMainFeed()
            .then(repos => this.setState({
                repos: repos,
                mounted: true
            }))
    }

    render() {
        const { repos, mounted } = this.state;
        console.log(repos);
        return (
            <div className="container">
                <div className="flex col container-sm">
                    <ul>
                        { mounted == true && repos.map((repo) => {
                            return (
                                <li className="item"> 
                                    <p className="title">{repo.title}</p>
                                    <p className="info">by {repo.by} on {repo.time} with kids comments</p>
                                    {console.log(repo.kids)}
                                </li>)
                            })

                            //repos && <pre>{JSON.stringify(repos, null, 2)}</pre>
                            // consider an if statement to rule out 'null'
                        }
                    </ul>
                    
                </div>
            </div>
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