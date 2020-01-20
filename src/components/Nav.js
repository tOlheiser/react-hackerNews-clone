import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <div className="container">
                    <ul className="flex between row container-sm clear">
                        <div className="flex">
                            <li>
                                <NavLink 
                                    to='/' 
                                    exact 
                                    className={`navLinks nav-${theme}`} >
                                        Top
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to='/new' 
                                    className={`navLinks nav-${theme}`} >
                                        New
                                </NavLink>
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