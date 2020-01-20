import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <div className="container">
                    <ul className="flex between row container-sm clear">
                        <div className="flex">
                            <li>
                                <Link to='/' className={`navLinks nav-${theme}`}>Top</Link>
                            </li>
                            <li>
                                <Link to='/new' className={`navLinks nav-${theme}`}>New</Link>
                            </li>
                        </div>
                        <div className="flex">
                            <li>
                                <button onClick={toggleTheme} className="pointer">
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