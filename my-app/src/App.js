import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Square extends React.Component {
  render() {
    console.log("in square")
    return (
      <button onClick={() => {this.props.setValue(this.props.position)}} className="square">
        {this.props.inputData.val}
      </button>
    );
  }
}

class Board extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      squaresArray: [{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''}],
      player: 'X'
    }
    this.superDuperClick = this.superDuperClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  renderSquare(i) {
    return <Square inputData={this.state.squaresArray[i]} position={i} setValue={this.superDuperClick}/>;
  }

  superDuperClick(index) {

    if (this.props.gameStatus != '')
      return
    if (this.state.squaresArray[index].val != '') {
      return 
    }
    let updatedArray = this.state.squaresArray;
    updatedArray[index].val = this.state.player;
    console.log(updatedArray)
    this.setState({squaresArray: updatedArray});
    // call my didYouWin function 
    if (!this.didYouWin()) {
          if (this.state.player === 'X')
          {
            this.setState({player: 'O'});
          }
          else
          {
            this.setState({player: 'X'});
          }
    } else {
      this.props.updateGameStatus(this.state.player + " wins!")
    }
/*
    if (this.didYouWin())
    {
      this.setState({squaresArray: updatedArray});
      alert("Congrats!  You\'re a winner!!");
      this.setState({squaresArray: [{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''}]})
    }
*/
  }


    
   didYouWin()  {
      let localArr = this.state.squaresArray;
      let curPlayer = this.state.player;
      let win = curPlayer + curPlayer + curPlayer;
      switch(win){
        case localArr[0].val + localArr[1].val + localArr[2].val:
          return true;
        case localArr[3].val + localArr[4].val + localArr[5].val:
          return true;
          case localArr[6].val + localArr[7].val + localArr[8].val:
          return true;
        case localArr[0].val + localArr[3].val + localArr[6].val:
          return true;
        case localArr[1].val + localArr[4].val + localArr[7].val:
          return true;
        case localArr[2].val + localArr[5].val + localArr[8].val:
          return true;
        case localArr[0].val + localArr[4].val + localArr[8].val:
          return true;
        case localArr[2].val + localArr[4].val + localArr[6].val:
          return true;
        default:
        console.log("you didnt win")
          return false;
      }
  }

  resetGame() {
      this.setState({squaresArray: [{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''},{val:''}]})
      this.props.updateGameStatus("")
    }

  render() {
    const status = 'Next player: ' + this.state.player;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={() => {this.resetGame()}}>New Game</button>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status: ''
    }
    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus(updatedStatus) {
    this.setState({status: updatedStatus})
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board gameStatus = {this.state.status} updateGameStatus={this.updateStatus}/>
        </div>
        <div className="game-info">
          <div>{this.state.status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;