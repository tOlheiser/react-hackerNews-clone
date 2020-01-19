import React from 'react';
import Loading from './Loading';
import { getComments, getItemDate } from '../utils/api.js';
import { Link } from 'react-router-dom';

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
        const { style } = this.props;

        const lightUsername = {
            color: "#000",
        }

        const darkUsername = {
            color: "#BEBEBE",
        }

        const lightContent = {
            color: "#000",
        }

        const darkContent = {
            color: "#DADADA",
        }

        const lightContainer = {
            backgroundColor: "#EDEDED",
        }

        const darkContainer = {
            backgroundColor: "#2A2D2F",
        }

        return (
            <React.Fragment>
                <ul>
                {comments == null 
                ? <Loading loading="Fetching comments"/>

                : comments.map(comment => 
                    <li key={comment.id}>
                        <div className="commentContainer">
                            <div className="flex commentSmContainer col" style={lightContainer}>
                                <p className="commentText commentInfo">{`by `}
                                    <Link className="infoLink" to={{
                                        pathname: '/user',
                                        search: `?id=${comment.by}`
                                    }}>
                                        {comment.by}
                                    </Link>

                                    {`on`}{getItemDate(comment.time)}
                                </p>
                                
                                <p 
                                    className="commentText" 
                                    style={lightContent} 
                                    dangerouslySetInnerHTML={{__html: comment.text}}>
                                </p>
                            </div>
                        </div>
                    </li>
                )
                }
                </ul>
            </React.Fragment>
        )
    }
}