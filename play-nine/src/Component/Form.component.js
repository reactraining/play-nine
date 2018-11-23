import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    state = {
        userName: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Form submit ', this.state.userName);
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.props.onSubmit(resp.data);
                this.setState({ userName: '' });
            });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value={this.state.userName}
                    onChange={(event) => this.setState({ userName: event.target.value })}
                    placeholder="Github username" required />
                <button type="submit">Add card</button>
            </form>
        );
    };
}

export default Form;