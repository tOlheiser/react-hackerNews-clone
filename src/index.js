import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import { getMainFeed, getItemDate } from './api.js';

class Nav extends React.Component {

    render() {
        const { feed } = this.props; 

        return (
            <div className="container">
                <ul className="flex between row container-sm clear">
                    <div className="flex">
                        <li className={`nav-font ${feed === 'top' && 'active'}`} onClick={() => this.props.displayFeed('top')}>Top</li>
                        <li className={`nav-font ${feed === 'new' && 'active'}`} onClick={() => this.props.displayFeed('new')}>New</li>
                    </div>
                    <div className="flex">
                        <li className="nav-font" >Styles</li>
                    </div>
                </ul><br></br>
            </div>
        );
    }
}

class Feed extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: null
        };
    }

    componentDidMount() {
        console.log(this.props.feed);
        getMainFeed(this.props.feed)
            .then(items => this.setState({
                items: items
            }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.feed !== prevProps.feed) {
            console.log(this.props.feed);
            getMainFeed(this.props.feed)
                .then(items => this.setState({
                    items: items
                }))
        }
    }

    render() {
        const { items } = this.state;
        return (
            <div className="container">
                <div className="flex col container-sm">
                    <ul>
                        { items != null && items.map((item) => {
                            return (
                                <li className="item"> 
                                    <p><a className="title" href="#">{item.title}</a></p>
                                    <p className="info">by <a className="infoLink" href="#">{item.by}</a> on {getItemDate(item.time)} with <a className="infoLink" href="#">{item.kids != null ? item.kids.length : '0'}</a> comments</p>
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
    constructor(props) {
        super(props);
        
        this.state = {
            feed: 'top',
        };

        this.displayFeed = this.displayFeed.bind(this);
    }

    displayFeed(feed) {
        this.setState({
            feed: feed
        })
    }

    render() {
        return (
            <React.Fragment>
                <Nav 
                    displayFeed={this.displayFeed}
                    feed={this.state.feed}
                />
                <Feed 
                    feed={this.state.feed}
                />
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