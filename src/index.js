import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import { getMainFeed, getItemDate } from './api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb as lightStyles } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as darkStyles } from '@fortawesome/free-regular-svg-icons';

class Nav extends React.Component {

    render() {
        const { feed, setFeed, toggleStyles, style } = this.props; 

        return (
            <div className="container">
                <ul className="flex between row container-sm clear">
                    <div className="flex">
                        <li className={`nav-font ${feed === 'top' && 'active'}`} onClick={() => setFeed('top')}>Top</li>
                        <li className={`nav-font ${feed === 'new' && 'active'}`} onClick={() => setFeed('new')}>New</li>
                    </div>
                    <div className="flex">
                        <li className="nav-font" ><FontAwesomeIcon onClick={toggleStyles} className="lightbulb" icon={style === 'light' ? lightStyles : darkStyles} /></li>
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
        getMainFeed(this.props.feed)
        // returns the feed of items in JSON format.
            .then(items => this.setState({
                //grab the items and store them in the 'items' state.
                items: items
            }))
    }

    componentDidUpdate(prevProps) {
        // compare the current state of feed to the previous
        if (this.props.feed !== prevProps.feed) {
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
                                <li className="item" key={item.id}> 
                                    <p><a className="title" href={item.url}>{item.title}</a></p>
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
            style: 'light'
        };

        this.setFeed = this.setFeed.bind(this);
        this.toggleStyles = this.toggleStyles.bind(this);
    }

    setFeed(feed) {
        this.setState({
            feed: feed
        })
    }


    toggleStyles() {
        // Setting state based on previous state
        this.setState((state) => ({
            style: state.style == 'light' ? 'dark' : 'light'
        }));
    }

    render() {
        return (
            <React.Fragment>
                <Nav 
                    setFeed={this.setFeed}
                    toggleStyles={this.toggleStyles}
                    feed={this.state.feed}
                    style={this.state.style}
                />
                <Feed 
                    feed={this.state.feed}
                />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));