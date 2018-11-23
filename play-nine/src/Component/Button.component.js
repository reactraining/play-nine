import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
    let button;

    switch (props.answerIsCorrect) {
        case true:
            button = <button className="btn btn-success" onClick={() => props.acceptAnswer()} disabled={props.selectedNumbers.length === 0}>
                <FontAwesomeIcon icon="check" />
            </button>
            break;
        case false:
            button = <button className="btn btn-danger" onClick={() => props.checkAnswer()} disabled={props.selectedNumbers.length === 0}>
                <FontAwesomeIcon icon="times" />
            </button>

            break;
        default:
            button = <button className="btn" onClick={() => props.checkAnswer()} disabled={props.selectedNumbers.length === 0}>=</button>
            break;
    }

    return (<div className="col-2 text-center">
        {button}
        <br /><br />
        <button className="btn btn-warning btn-sm" onClick={() => props.changeStarsNumber()} disabled={props.redrawsLeft <= 0} >
            <FontAwesomeIcon icon="redo" /> {props.redrawsLeft}
        </button>
    </div>);
};

export default Button;