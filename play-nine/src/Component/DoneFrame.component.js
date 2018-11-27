import React from 'react';
import FortuneCookie from './FortuneCookie.component';
import LeaderBoard from './LeaderBoard.component';


const DoneFrame = (props) => {
    return (
        <div className='done-container'>
            <div className='text-center'>
                <h4>
                    {props.doneStatus.text}
                </h4>
                <button className="btn btn-secondary text-center" onClick={props.playAgain}>Play Again</button>
            </div>
            <br />

            <LeaderBoard time={props.time} isSuccess={props.isSuccess}/>
            {props.doneStatus.isSuccess ?
                <div></div>
                :
                <FortuneCookie />
            }
        </div>
    )
}

export default DoneFrame;