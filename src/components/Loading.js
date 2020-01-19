import React from 'react';

export default class Loading extends React.Component {
    // componentWillUnmount - clear interval
    constructor(props) {
        super(props);

        this.state = {
            loading: this.props.loading
        }
        this.loadingMessage = this.loadingMessage.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.loadingMessage, 400);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadingMessage() {
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
            <div className="container">
                <div className="flex container-sm col">
                    <h2 className="center">{this.state.loading}</h2>        
                </div>
            </div>  
        )
    }
}