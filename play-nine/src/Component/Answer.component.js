import React from 'react';

const Answer = (props) => {
    return (
        <div className="col-5 answer-container">
            {props.selectedNumbers.map((number,i) =>
            <span key={i} onClick={() => props.handleClick(number)}>{number}</span>
            )}
        </div>
    );
};

export default Answer;