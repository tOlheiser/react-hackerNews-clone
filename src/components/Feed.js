import React from 'react';
import Loading from './Loading';
import Item from './Item';
import { getMainFeed } from '../utils/api.js';
import { ThemeConsumer } from '../contexts/theme';

export default class Feed extends React.Component {
    state = {
        items: null
    };

    componentDidMount() {
        const { pathname } = this.props.location;

        getMainFeed(pathname === '/new' ? 'new' : 'top')
            .then(items => this.setState({
                items: items
            }))
    }

    render() {
        const { items } = this.state;

        return (
            <ThemeConsumer>
                {({theme}) => (
                    <div className='container'>
                        <div className="col container-sm">
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
                                            key={item.id}
                                        /> )
                                    })
                                }
                            </ul>  
                        </div>
                    </div>                    
                )}
            </ThemeConsumer>
        );
    }
}