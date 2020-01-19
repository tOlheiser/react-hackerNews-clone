import React from 'react';
import Loading from './Loading';
import UserFeed from './UserFeed';
import { getItemDate, getUserProfile } from '../utils/api.js';
import queryString from 'query-string';

export default class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null
        };
    }

    componentDidMount() {
        const { search } = this.props.location;

        getUserProfile(queryString.parse(search).id)
            .then((profile) => this.setState({
                profile: profile,
            }));
    }

    render() {
        const { profile } = this.state;
        const username = queryString.parse(this.props.location.search).id;

        const userHeadingLight = {
            color: "#000"
        }

        const userHeadingDark = {
            color: "#DADADA"
        }

        return (
            <React.Fragment>    
                {profile == null ? 
                <React.Fragment>
                    <Loading loading="Fetching user" /> 
                </React.Fragment>
                
                : <React.Fragment>
                    <div className="container">
                        <div className="flex container-sm col">
                            <h1 className="userHeading" 
                                style={userHeadingLight}>
                                {profile.id}
                            </h1>
                            <p className="userInfo">joined 
                                <span className="userData"> {getItemDate(profile.created)} </span>
                                has <span className="userData">{profile.karma} </span>karma
                            </p>  
                        </div>
                    </div>

                    <React.Fragment>
                        <UserFeed 
                            username={username}
                            postIDs={profile.submitted}
                        />
                    </React.Fragment>
                </React.Fragment>
                }
            </React.Fragment>
        )
    }
}