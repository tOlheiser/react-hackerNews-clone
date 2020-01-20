import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {

    render() {

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
            <ThemeConsumer>
                {({ theme, toggleTheme }) => (
                    <div className="container">
                    <ul className="flex between row container-sm clear">
                        <div className="flex">
                            <li style={navStyle} className="navLinks">
                                <Link to='/'>Top</Link>
                            </li>
                            <li style={navStyle} className="navLinks">
                                <Link to='/new'>New</Link>
                            </li>
                        </div>
                        <div className="flex">
                            <li className="navLinks" >
                                <button onClick={toggleTheme}>
                                    {theme === 'light' ? '\u{1F4A1}' : '\u{1F526}'}
                                </button>
                            </li>
                        </div>
                    </ul><br></br>
                </div>
                )}
            </ThemeConsumer>
        );
    }
}