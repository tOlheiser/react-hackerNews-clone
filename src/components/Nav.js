import React from 'react';
import { ThemeConsumer } from '../contexts/theme';
import { NavLink } from 'react-router-dom';

const active = {
    color: '#BB2E1F'
}

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <div className="container">
                    <ul className="space-between row nav">
                        <div className="row">
                            <li>
                                <NavLink 
                                    to='/' 
                                    exact 
                                    activeStyle={active}
                                    className={`navLinks nav-${theme}`} >
                                        Top
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to='/new' 
                                    activeStyle={active}
                                    className={`navLinks nav-${theme}`} >
                                        New
                                </NavLink>
                            </li>
                        </div>
                        <div className="flex">
                            <li>
                                <button onClick={toggleTheme} className="pointer">
                                    {theme === 'light' ? '\u{1F526}' : '\u{1F4A1}'}
                                </button>
                            </li>
                        </div>
                    </ul><br></br>
                </div>
            )}
        </ThemeConsumer>
    );
}