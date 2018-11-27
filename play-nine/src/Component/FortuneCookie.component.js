import React, { Component } from 'react';
import FortuneCookieService from '../Service/FortuneCookie.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FortuneCookie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            randomNumber: Math.random() * 100,
            textToDisplay: '',
            display: false
        };

        FortuneCookieService.getAny(this.state.randomNumber).then((response) => {
            this.setState({ textToDisplay: response.data[0].message, display: true });
        });
    };


    render() {
        return (
            <div className='fortunecookie-container text-center'>
                <hr />
                {this.state.display ?

                    <div>
                        <h4>Don't be sad, have a fortune cookie: </h4>
                        <p className="font-weight-bold font-italic">"{this.state.textToDisplay}"</p>
                    </div> :
                    <div className='text-center'>
                        <FontAwesomeIcon icon='spinner' />
                    </div>
                }
            </div >
        )
    };
}

export default FortuneCookie;