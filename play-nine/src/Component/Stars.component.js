import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

const Stars = (props) => {

    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map((i) => <FontAwesomeIcon icon="star" key={i} />)}
        </div>
    );
};


export default Stars;