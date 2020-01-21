import React from 'react';
import { ThemeConsumer } from '../contexts/theme';

export default class Loading extends React.Component {
    state = {
        loading: this.props.loading
    }

    componentDidMount() {
        this.interval = setInterval(this.loadingMessage, 400);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadingMessage = () => {
        const { loading } = this.state;
        
        if (loading === this.props.loading + "...") {
            this.setState({
                loading: this.props.loading
            })
        } else {
            this.setState(({ loading }) => ({
                loading: loading + ".",
            }));
        }
    }

    render() {
        return(
            <ThemeConsumer>
                {({ theme }) => (
                    <div className="container">
                        <div className="flex container-sm col">
                            <h2 className={`center content-${theme}`}>{this.state.loading}</h2>        
                        </div>
                    </div>
                )}
            </ThemeConsumer>
        )
    }
}