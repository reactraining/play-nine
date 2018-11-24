import React, { Component } from 'react';
import FortuneCookieService from '../Service/FortuneCookie.service';

class FortuneCookie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            randomNumber: Math.random() * 100,
            textToDisplay: ''
        };

        FortuneCookieService.getAny(this.state.randomNumber).then((response) =>{
            this.setState({ textToDisplay : response.data[0].message});
        });
    };


    render() {
        return (
            <div>
                <hr />
                <h3>Don't be sad, have a fortune cookie: </h3>
                <p className="font-weight-bold font-italic">"{this.state.textToDisplay}"</p>
            </div >
        )
    };
}

export default FortuneCookie;