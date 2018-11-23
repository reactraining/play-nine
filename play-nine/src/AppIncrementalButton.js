// Write JavaScript here and press Ctrl+Enter to execute
import React, { Component } from 'react';

class Button extends Component{

    handleClick = () =>{
         this.props.onClickFunction(this.props.incrementValue);
   };
     
       render(){
         return(
           <button onClick={this.handleClick}>
             +{this.props.incrementValue}
         </button>
       );
     }
   };
   
   const Result = (props) => {
   return (
       <div> {props.label} </div>
   );};
   
   class App extends Component{
   state = { counter: 0 };
   
       incrementCounter = (incrementValue) =>{ 
         this.setState((prevState) => ({ counter: prevState.counter + incrementValue }));
     }
     
       render(){
         return(
           <div>
             <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
           <Button incrementValue={2} onClickFunction={this.incrementCounter}/>
           <Button incrementValue={3} onClickFunction={this.incrementCounter}/>
           <Button incrementValue={4} onClickFunction={this.incrementCounter}/>
           <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
           <br/>
           
           <br/>
           <br/>
           <br/>
           
           <Result label = {this.state.counter}/>
         </div>
       )
     }
   }
   
   export default App;