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
            items: null,
        };
    }

    componentDidMount() {
        getMainFeed()
            .then(items => this.setState({
                items: items,
            }))
    }

    render() {
        const { items } = this.state;
        console.log(items);
        return (
            <div className="container">
                <div className="flex col container-sm">
                    <ul>
                        { items != null && items.map((item) => {
                            return (
                                <li className="item"> 
                                    <p><a className="title" href="#">{item.title}</a></p>
                                    <p className="info">by <a className="infoLink" href="#">{item.by}</a> on {item.time} with <a className="infoLink" href="#">{item.kids != null && item.kids.length}</a> comments</p>
                                    {console.log(item.kids)}
                                </li>)
                            })
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