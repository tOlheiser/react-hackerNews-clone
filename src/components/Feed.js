import React from 'react';
import Loading from './Loading';
import { getMainFeed } from '../utils/api.js';
import Item from './Item';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            items: null
        };
    }

    componentDidMount() {
        const { pathname } = this.props.location;

        getMainFeed(pathname === '/new' ? 'new' : 'top')
        // returns the feed of items in JSON format.
            .then(items => this.setState({
                //grab the items and store them in the 'items' state.
                items: items
            }))
    }

    render() {
        const { items } = this.state;
        const { style } = this.props;

        const lightTitle = {
            color: '#BB2E1F',
        }

        const darkTitle = {
            color: '#CBCBCB',
        }

        const lightLink = {
            color: '#000',
        }

        const darkLink = {
            color: '#BEBEBE',
        }

        const titleStyle = style === 'light' ? lightTitle : darkTitle;
        const linkStyle = style === 'light' ? lightLink : darkLink;

        return (
            <div className="container">
                <div className="flex col container-sm">
                    <ul>
                        { items == null ? 
                            <Loading loading="Loading" />
                        : items.map((item) => {
                            return (
                                <Item 
                                    id={item.id} 
                                    url={item.url} 
                                    title={item.title} 
                                    author={item.by}
                                    time={item.time} 
                                    comments={item.descendants}
                                /> )
                            })
                        }
                    </ul>
                    
                </div>
            </div>
        );
    }
}


