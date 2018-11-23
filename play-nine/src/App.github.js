import React, { Component } from 'react';
import CardList from './Component/Cardlist.component';
import Form from './Component/Form.component';

class App extends Component {
    state = {
        cards: []
    };

    addNewCard = (cardInfo) => {
        this.setState(prevState =>({
            cards: prevState.cards.concat(cardInfo)
        }))
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}

export default App;