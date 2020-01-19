import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {

    render() {
        const { feed, setFeed, toggleStyles, style } = this.props; 

        const lightNav = {
            color: '#000',
        }

        const darkNav = {
            color: '#CBCBCB',
        }

        const active = {
            color: '#BB2E1F'
        }

        // Determine the correct nav style, then fall back on it for the feed that isn't active.
        const navStyle = style === "light" ? lightNav : darkNav;

        return (
            <div className="container">
                <ul className="flex between row container-sm clear">
                    <div className="flex">
                        <li style={feed === 'top' ? active : navStyle} className="navLinks" onClick={() => setFeed('top')}>
                            <Link to='/'>Top</Link>
                        </li>
                        <li style={feed === 'new' ? active : navStyle} className="navLinks" onClick={() => setFeed('new')}>
                            <Link to='/new'>New</Link>
                        </li>
                    </div>
                    <div className="flex">
                        <li className="navLinks" ><button onClick={toggleStyles}>{style === 'light' ? '\u{1F4A1}' : '\u{1F526}'}</button></li>
                    </div>
                </ul><br></br>
            </div>
        );
    }
}