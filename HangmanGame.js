import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';


const pics = [
  'noose.png',             
  'upperbody.png',          
  'upperandlowerbody.png', 
  '1arm.png',               
  'botharms.png',           
  '1leg.png',
  'Dead.png'                
];


const words = [
  "Morehouse",
  "Spelman",
  "Basketball",
  "Table",
  "Museum",
  "Excellent",
  "Fun",
  "React"
];

class HangmanGame extends React.Component {
  state = {
    wordList: [],
    curWord: 0,         
    lifeLeft: 0,        
    usedLetters: []     
  };

  componentDidMount() {
  
    this.setState({ wordList: words });
  }

  
  startNewGame = () => {
    this.setState({
      curWord: Math.floor(Math.random() * this.state.wordList.length),
      lifeLeft: 0,
      usedLetters: []
    });
  };

 
  handleGuess = (letter) => {
    letter = letter.toLowerCase();

    if (this.state.usedLetters.includes(letter)) return;

    const { wordList, curWord, usedLetters, lifeLeft } = this.state;
    const currentWord = wordList[curWord].toLowerCase();

    let updatedLetters = [...usedLetters, letter];

   
    let updatedLifeLeft = lifeLeft;
    if (!currentWord.includes(letter)) {
      updatedLifeLeft += 1;
    }

    this.setState({
      usedLetters: updatedLetters,
      lifeLeft: updatedLifeLeft
    });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSearchClick();
    }
  };
  
  renderWord = () => {
    const { wordList, curWord, usedLetters } = this.state;
    if (wordList.length === 0) return null;

    const word = wordList[curWord];
    return (
      <div style={{ margin: '20px' }}>
        {word.split('').map((char, idx) => {
          const isVisible = usedLetters.includes(char.toLowerCase());
          return (
            <LetterBox
              key={idx}
              letter={char}
              isVisible={isVisible}
              boxStyle={{ display: 'inline-block', margin: '5px' }}
              letterStyle={{ fontSize: '30px' }}
            />
          );
        })}
      </div>
    );
  };

  
  isWordGuessed = () => {
    const { wordList, curWord, usedLetters } = this.state;
    if (wordList.length === 0) return false;
    const word = wordList[curWord].toLowerCase();

    return word.split('').every((char) => usedLetters.includes(char));
  };

  render() {
    const { wordList, curWord, lifeLeft, usedLetters } = this.state;
    const maxMistakes = pics.length - 1;  
    const gameLost = lifeLeft >= maxMistakes;
    const gameWon = this.isWordGuessed();

    
    const currentPic = pics[lifeLeft] || pics[pics.length - 1];

    return (
      <div className="HangmanGame">
        <h1>Hangman Game</h1>

       
        <img src={currentPic} alt="Hangman" style={{ width: '200px' }} />

        <div>
          <button onClick={this.startNewGame}>New Game</button>
        </div>

        
        {this.renderWord()}

        
        {gameWon && <p>Congratulations! You guessed the word!</p>}
        {gameLost && (
          <p>
            Game Over! The word was: <b>{wordList[curWord]}</b>
          </p>
        )}

        
        {!gameWon && !gameLost && (
          <SingleLetterSearchbar onSearch={this.handleGuess} />
        )}

        
        <div>
          <h3>Used Letters:</h3>
          <p>{usedLetters.join(', ')}</p>
        </div>
      </div>
    );
  }
}

export default HangmanGame;
