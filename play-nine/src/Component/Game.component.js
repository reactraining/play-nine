import React, { Component } from 'react';
import Stars from './Stars.component';
import Button from './Button.component';
import Answer from './Answer.component';
import Numbers from './Numbers.component';
import DoneFrame from './DoneFrame.component';
import _ from 'lodash';
import Stopwatch from './Stopwatch.component';
import LeaderBoard from './LeaderBoard.Component';

class Game extends Component {
    static randomNumberOfStars = () => {
        return 1 + Math.floor(Math.random() * 9);
    }

    static initialState = {
        selectedNumbers: [],
        randomSelectedNumberOfStars: Game.randomNumberOfStars(),
        usedNumbers: [],
        answerIsCorrect: null,
        redrawsLeft: 5,
        doneStatus: null,
        time: null
    };

    constructor(props) {
        super(props);
        this.state = Game.initialState;
        this.stopWatch = React.createRef();
    }

    selectNumber = (clickedNumber) => {

        this.stopWatch.current.start();

        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            this.setState(prevState =>
                ({
                    selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
                    answerIsCorrect: null
                }));
        }
    };

    removeNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            this.setState(prevState => (
                {
                    selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
                    answerIsCorrect: null
                }
            ));
        }
    };

    checkAnswer = () => {
        this.setState((prevState) => ({
            answerIsCorrect: prevState.randomSelectedNumberOfStars ===
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    }

    acceptAnswer = () => {
        if (this.state.answerIsCorrect) {
            this.setState((prevState) => ({
                usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
                selectedNumbers: [],
                answerIsCorrect: null,
                randomSelectedNumberOfStars: Game.randomNumberOfStars()
            }), this.updateDoneStatus)
        }
    }

    changeStarsNumber = () => {
        this.stopWatch.current.start();

        if (this.state.redrawsLeft > 0) {
            this.setState((prevState) => ({
                randomSelectedNumberOfStars: Game.randomNumberOfStars(),
                selectedNumbers: [],
                answerIsCorrect: null,
                redrawsLeft: prevState.redrawsLeft - 1
            }), this.updateDoneStatus);
        }
    };

    possibleSolutions = ({ randomSelectedNumberOfStars, usedNumbers }) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1);

        return this.possibleCombinationSum(possibleNumbers, randomSelectedNumberOfStars)
    }

    updateDoneStatus = () => {
        this.setState((prevState) => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. Nice!', time: this.stopWatch.current.stop() }
            }
            if (prevState.redrawsLeft === 0 && !this.possibleSolutions(prevState)) {
                this.stopWatch.current.stop();
                return { doneStatus: 'Game Over!' };
            }
        });
    }

    playAgain = () => {
        this.setState(Game.initialState);
        this.stopWatch.current.reset();
    }

    possibleCombinationSum = (arr, n) => {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

    render() {
        const { selectedNumbers, randomSelectedNumberOfStars, answerIsCorrect, usedNumbers, redrawsLeft, doneStatus, time } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <h3 className='col-7'>Play Nine</h3>
                    <Stopwatch ref={this.stopWatch} restart={this.playAgain} />
                </div>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomSelectedNumberOfStars} />
                    <Button
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect}
                        selectedNumbers={selectedNumbers}
                        acceptAnswer={this.acceptAnswer}
                        changeStarsNumber={this.changeStarsNumber}
                        redrawsLeft={redrawsLeft} />
                    <Answer selectedNumbers={selectedNumbers} handleClick={this.removeNumber} />
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame doneStatus={doneStatus} playAgain={this.playAgain} /> :
                    <Numbers selectNumber={this.selectNumber} selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} />
                }
                {time ?
                    <LeaderBoard time={this.time} /> : <div></div>

                }
            </div>
        );
    }
}

export default Game;