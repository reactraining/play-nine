import React from 'react';
import FortuneCookie from './FortuneCookie.component';

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>
                {props.doneStatus.text}
            </h2>
            <button className="btn btn-secondary" onClick={props.playAgain}>Play Again</button>
            {props.doneStatus.isSuccess ?
                '' :
                <FortuneCookie />
            }
        </div>
    )
}

export default DoneFrame;