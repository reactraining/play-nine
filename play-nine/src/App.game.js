import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Game from './Component/Game.component';


library.add(fas)

class App extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <Game />
            </div>
        );
    };

};

export default App;