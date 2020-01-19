import React from 'react';
import { Link } from 'react-router-dom';
import { getItemDate } from '../utils/api.js';
//import User from './User';
//import Comment from './Comment';

export default function Item(props) {
    const {id, url, title, author, time, comments} = props;

    return(
        <li className="item" key={id}> 
            <h3 className="postHeading"><a className="title" href={url}>{title}</a></h3>
            <p className="info">{`by `} 
                
                <Link className="infoLink" to={{
                    pathname: '/user',
                    search: `?id=${author}`
                }}>{author}</Link>

                {` on `}{getItemDate(time)}{` with `} 
                        
                <Link className="" to={{
                    pathname: '/post',
                    search: `?id=${id}`
                }}>
                    {comments}
                </Link>   
                        
                {comments === 1 ? ' comment ' : ' comments '}
            </p>
        </li>
    )
}

//<Route path='/user' component={User} />
//<Route path='/discussion' component={Comment}/>


//<Route path={`/user?username=${author}`} />
//<Route path={`/discussion?id=${id}`} />

