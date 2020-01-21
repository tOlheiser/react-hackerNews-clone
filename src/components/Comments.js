import React from 'react';
import Loading from './Loading';
import { getComments, getItemDate } from '../utils/api.js';
import { Link } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: null,
        }
    }

    componentDidMount() {
        getComments(this.props.commentIDs)
            .then(item => this.setState({
                comments: item
            })) 
    }

    render() {
        const { comments } = this.state;
        const { numComments } = this.props;

        return (
            <React.Fragment>
                <ul>
                    {numComments != 0 ? 
                        (comments == null 
                            ? <Loading loading="Fetching comments"/>
                            : <ThemeConsumer>
                                {({ theme }) => (
                                    comments.map(comment => 
                                        <li key={comment.id}>
                                            <div className="container">
                                                <div className={`commentCard col container-${theme}`}>
                                                    <p className="commentInfo">{`by `}
                                                        <Link className={`link-${theme}`} to={{
                                                            pathname: '/user',
                                                            search: `?id=${comment.by}`
                                                        }}>
                                                            {comment.by}
                                                        </Link>

                                                        {` on `}{getItemDate(comment.time)}
                                                    </p>
                                                    
                                                    <p 
                                                        className={`comment content-${theme}`} 
                                                        dangerouslySetInnerHTML={{__html: comment.text}}>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ThemeConsumer>
                        ) : null 
                    }
                </ul>
            </React.Fragment>
        )
    }
}