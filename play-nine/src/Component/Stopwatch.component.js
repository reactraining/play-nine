import React, { Component } from 'react';

class Stopwatch extends Component {
    static initialState = {
        isRunning: false,
        runningSeconds: 0,
        runningMs: 0,
        runningMinutes: 0,
        incrementer: null
    };

    constructor(props) {
        super(props);
        this.state = Stopwatch.initialState;
    }

    stop = () => {
        clearInterval(this.state.incrementer);

        this.setState({ incrementer: null, isRunning: false });
        return { seconds: this.getSeconds(), milliseconds: this.getMiliSeconds(), minutes: this.getMinutes() }
    }

    start = () => {
        if (!this.state.isRunning) {
            var _this = this;
            this.setState({
                incrementer: setInterval(function () {
                    _this.setState((prevState) => {
                        var milliseconds = (prevState.runningMs + 10);
                        return {
                            runningMs: milliseconds,
                            runningSeconds: Math.floor(milliseconds / 1000),
                            runningMinutes: Math.floor(milliseconds / 60000),
                            isRunning: true
                        }
                    })
                }, 10)
            })
        }
    }

    reset = () => {
        this.setState(Stopwatch.initialState);
    }

    getSeconds = () => {
        return this.getValue(60, this.state.runningSeconds);
    }

    getMiliSeconds = () => {
        return this.getValue(100, this.state.runningMs);
    }

    getMinutes = () => {
        return this.getValue(60, this.state.runningMinutes);
    }

    getValue = (maxValue, stateValue) => {
        return ('0' + stateValue % maxValue).slice(-2);
    }

    togglePlayForFun = () => {
        if (this.props.restart) {
            this.props.restart();
        }

        clearInterval(this.incrementer);
        this.setState((prevState) => ({
            playForFun: !prevState.playForFun
        }));

        this.setState(Stopwatch.initialState);
    }

    handleRestart = () => {
        this.setState(Stopwatch.initialState);
        this.start();
    };



    render() {
        return (
            <div className='col-5 text-center stopwatch-container'>

                <h4>{this.state.playForFun ? 'Enjoy!' : 'Your time'}</h4>
                <div className={this.state.playForFun ? 'd-none' : ''}>
                    <span className="minutes">{this.getMinutes()}</span>:<span className="seconds">{this.getSeconds()}</span> <span className="tens">{this.getMiliSeconds()}</span>
                </div>
                <div className='btn-group'>
                    <button className='btn btn-danger btn-sm m-1' onClick={this.togglePlayForFun}>{this.state.playForFun ? 'Let\'s get competitive!' : 'Play for fun'}</button>
                    {/* <button className='btn btn-warning btn-sm m-1' onClick={this.handleRestart}>Restart</button> */}
                </div>
            </div>
        )
    };
}

export default Stopwatch;