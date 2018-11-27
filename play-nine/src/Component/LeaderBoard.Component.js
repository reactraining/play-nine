import React, { Component } from 'react';
import LeaderBoardService from '../Service/LeaderBoard.service';
import LeaderRecord from './LeaderRecord.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class LeaderBoard extends Component {
    constructor(props) {
        super(props);

        this.state = { winner: false, display: false };

        LeaderBoardService.getAll().then((response) => {
            let winner = false;
            let leaders = response.data
                .sort((a, b) =>
                    a.score > b.score ? 1 :
                        b.score > a.score ? -1 : 0
                );

            let timeString = props.time.minutes + ":" + props.time.seconds + " " + props.time.milliseconds;
            if (props.isSuccess && leaders[leaders.length - 1].score > timeString) {
                winner = true;
                let timesLeft = leaders.slice(0, 4);

                timesLeft.push({ id: 6, editable: props.isSuccess, score: timeString });

                leaders = timesLeft
                    .sort((a, b) =>
                        a.score > b.score ? 1 :
                            b.score > a.score ? -1 : 0);
            }

            leaders = leaders.map((item, index) => {
                item.rank = index + 1;
                return item;
            });


            this.setState({
                leaders: leaders.map(leader => <LeaderRecord key={leader.id} {...leader} />),
                winner: winner,
                display: true
            });
        });
    }

    render() {
        return (
            <div className='leaderboard-container'>
                {this.state.display ?
                    (
                        <div>
                            <h4 className='text-center'>
                                {
                                    !this.props.isSuccess ? "Sorry, you must finish the game to be in the top!" :
                                        !this.state.winner ? "So close, and yet not quite there. Try again but be faster!" :
                                            "Good job! You've made it to the top! Enter your superhero name below!"
                                }
                            </h4>
                            <div className='text-center'>
                                <h4>Top scorers</h4>
                            </div>
                            <div className='container'>
                                <div className='row justify-content-sm-center'>
                                    <div className='col-sm-1 border text-center'>
                                        #
                        </div>
                                    <div className='col-sm-3 border text-center'>
                                        Name
                        </div>
                                    <div className='col-sm-3 border text-center'>
                                        Time
                        </div>
                                </div>
                                {this.state.leaders}
                            </div>
                        </div>
                    )
                    :
                    <div className='text-center'>
                        <FontAwesomeIcon icon='spinner' />
                    </div>
                }
            </div>
        );
    }
};

export default LeaderBoard;