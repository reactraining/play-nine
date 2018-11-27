import React, { Component } from 'react';

const LeaderRecord = (props) => {

    function handleSubmit() {
        props.handleSubmit();
    }

    return (
        <div className='row justify-content-sm-center'>
            <div className='col-sm-1 border text-center'>
                <span className="align-middle">
                    {props.rank}
                </span>
            </div>

            <div className='col-sm-3 border'>
                {!props.editable ?
                    <span className="align-middle text-nowrap">{props.name}</span>
                    :
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            placeholder="Super hero name here" className='mt-2 mb-2 align-middle' required />
                        <button className='btn align-middle btn-sm m-0' type="submit">Save</button>
                    </form>
                }
            </div>

            <div className='col-sm-3 border'>
                <span className='align-middle'>
                    {props.score}
                </span>
            </div>
        </div>
    )
}

export default LeaderRecord;