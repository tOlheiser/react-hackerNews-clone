import React from 'react';
import { Link } from 'react-router-dom';
import { getItemDate } from '../utils/api.js';
import { ThemeConsumer } from '../contexts/theme.js';

export default function Item({id, url, title, author, time, comments}) {

    return(
        <ThemeConsumer>
            {({ theme }) => (
                <li className="item" key={id}> 
                    <h3><a className={`title title-${theme}`} href={url}>{title}</a></h3>
                    <p className="info">{`by `} 
                        
                        <Link className={`link-${theme}`} to={{
                            pathname: '/user',
                            search: `?id=${author}`
                        }}>{author}</Link>

                        {` on `}{getItemDate(time)}{` with `} 
                                
                        <Link className={`link-${theme}`} to={{
                            pathname: '/post',
                            search: `?id=${id}`
                        }}>
                            {comments}
                        </Link>   
                                
                        {comments === 1 ? ' comment ' : ' comments '}
                    </p>
                </li>
            )}

        </ThemeConsumer>
    )
}

