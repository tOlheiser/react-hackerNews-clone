import React from 'react';
import Loading from './Loading';
import UserFeed from './UserFeed';
import { getItemDate, getUserProfile } from '../utils/api.js';
import queryString from 'query-string';
import { ThemeConsumer } from '../contexts/theme';

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

        return (
            <React.Fragment>    
                {profile == null ? 
                <React.Fragment>
                    <Loading loading="Fetching user" /> 
                </React.Fragment>
                
                : <ThemeConsumer>
                    {({ theme }) => (
                        <React.Fragment>
                            <div className="container">
                                <div className="flex container-sm col">
                                    <h1 className={`userHeading heading-${theme}`}>
                                        {profile.id}
                                    </h1>

                                    <p className="userInfo">joined 
                                        <span className="userData"> {getItemDate(profile.created)} </span>
                                        has <span className="userData">{profile.karma.toLocaleString()} </span>karma
                                    </p>

                                    { profile.about != null && 
                                        <p dangerouslySetInnerHTML={{__html: profile.about}}></p> 
                                    }
                                </div>
                            </div>

                            <React.Fragment>
                                <UserFeed 
                                    postIDs={profile.submitted}
                                />
                            </React.Fragment>
                        </React.Fragment>
                    )}
                </ThemeConsumer> 
                }
            </React.Fragment>
        )
    }
}