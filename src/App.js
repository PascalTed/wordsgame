import React from 'react';
import DisplayButton from './DisplayButton';
import DisplayScore from './DisplayScore';
import DisplayLetters from './DisplayLetters';
import DisplayWord from './DisplayWord';
import DisplayGameState from './DisplayGameState';
import DisplayNumberTest from './DisplayNumberTest';
import './App.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const words = [{word :'ELEPHANT', clue: 'pachyderme'}, {word :'SOLEIL', clue: 'étoile'}, {word :'CERISE', clue: 'fruit'}];
let chosenWord = 0;

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            word : this.generateWord(),
            gameState : "stop",
            score: 0,
            chance: 6,
            lettersUsed: [],
            lettersUsedAfter : [],
        };
    }
    
    generateWord () {

        if ((chosenWord + 1) <= words.length){
            return words[chosenWord].word;
        } else {
            chosenWord = 0;
            return words[chosenWord].word;
        }
    }
    
    buttonState () {

        const {gameState, chance} = this.state;

        if (gameState === "stop") {
            return "Commencer à jouer";

        } else if (gameState === "start" || gameState === "animation" || gameState === "initStart") {
            console.log(chance)
            return "Découvrir le mot";

        } else if (gameState === "perdu" || gameState === "Fini") {
            console.log(gameState)
            return "Nouvelle Partie";

        } else if (gameState === "mot trouvé") {
            return "Mot suivant";

        }
    }
    
    handleButtonClick = () => {

        const {gameState, chance, lettersUsed} = this.state;
        console.log(gameState)

        if (gameState === "stop") {
            this.setState((prevState, props) => ({
                gameState: prevState.gameState = "initStart"}));
        // Pour découvrir le mot (fera perdre des points)
        } else if (gameState === "initStart" || gameState === "start") {
                const decouv = this.state.word.split("");
                console.log("lettersUsed[]")
            this.setState((prevState, props) => ({
                    lettersUsed : prevState.lettersUsed = [...lettersUsed, ...decouv], gameState: "découvrir mot"
                }), this.timeToCheckWord);
          
            console.log("this.state.gameState");           

        } else if (gameState === "mot trouvé" || gameState === "mot découvert") {

            
                chosenWord = chosenWord + 1;
                this.setState({lettersUsed : [], lettersUsedAfter : [], gameState: "initStart", word : this.generateWord(), chance : 6
            });
          

        } else if (gameState === "Fini" || gameState === "perdu" || gameState === "mot découvert et fin") {
            chosenWord = 0;
            this.setState({lettersUsed : [], lettersUsedAfter : [], gameState: "initStart", score : 0, chance : 6, word : this.generateWord()});
        }
        
     
    }
    
    displayGameState () {

        const {gameState, word} = this.state;

        /*if (gameState === "start") {      
            return "Partie en cours";
        } */
        if (gameState === "Fini") {
           return "BRAVO !!! vous avez trouvé le dernier mot :";            
        }
        /*else if (gameState === "stop") {
            return 'Cliquer pour commencer';
        }*/
        else if (gameState === "mot trouvé") {    
            return "BRAVO !!! vous avez trouvé le mot :";
        }
        else if (gameState === "perdu") {    
            return "PERDU !!!";
        }
    }
    
    handleLetterClick = (e, letter) => {

        const {gameState, lettersUsed} = this.state;
        
     
        // Ajouter lettre cliquée et vérifier
        if (gameState === "start" || gameState === "initStart") {
            console.log(this.state.gameState)
            if (!lettersUsed.includes(letter)) {
                     
                this.setState((prevState) => ({
                    gameState: "animation", lettersUsed :  [...prevState.lettersUsed, letter]
                }),this.timeToCheckWord);
             }
        }
     
    }
    
    verifiedLetters(letter) {

        const {word, lettersUsed} = this.state;

        if(lettersUsed.includes(letter) && word.includes(letter)) {
            return 'letterInWord';
        } else if (lettersUsed.includes(letter) && !word.includes(letter)) {
            return 'letterNotInWord';
        } else if (this.state.gameState !== "start") {
            return 'letterNotAllowed';
        } else if (!lettersUsed.includes(letter) && this.state.gameState === "start") {
            return 'noClickLetter';
        }
    }

    timeToCheckWord = () => {
        console.log("time");
        setTimeout(this.checkWord,2000);
    }

    checkWord = () => {

        const {word, lettersUsed, lettersUsedAfter} = this.state;
        console.log(this.hiddenWord(lettersUsed))
          
        
        let addToScore = 0
        for(let i = 0; i < word.length; i++) {
            if (word[i] === lettersUsed[lettersUsed.length-1]) {
                addToScore += 1
            }
        }

        if (word === this.hiddenWord(lettersUsed)) {
           console.log(chosenWord)
            if ((chosenWord + 1) === words.length) {
                this.setState((prevState, props) => ({
                lettersUsedAfter : prevState.lettersUsed, gameState : prevState.gameState = "Fini", score : prevState.score += words.length + word.length + addToScore
                }));

            } else {
                this.setState((prevState, props) => ({
                lettersUsedAfter : prevState.lettersUsed ,gameState : prevState.gameState = "mot trouvé", score : prevState.score += word.length + addToScore
                }));
            }
        } else {
            
            console.log(addToScore)
            if (!word.includes(lettersUsed[lettersUsed.length-1])) {
                console.log("test")
                if (this.state.chance === 1) {
                    console.log("test2")
                    this.setState((prevState, props) => ({
                    gameState : prevState.gameState = "perdu", score : prevState.score - 1, chance : prevState.chance - 1
                    }));
                 } else {
                this.setState((prevState, props) => ({
                gameState : "start", score : prevState.score - 1, chance : prevState.chance - 1
                }));
            }
            } else {
                this.setState((prevState, props) => ({
                gameState : "start",lettersUsedAfter : prevState.lettersUsed, score : prevState.score + addToScore
                })); 
            } 
        }
        
    }

    hiddenWord (letterInUsed) {
        
        const { word } = this.state;
         return word.replace(/\w/g, (letter) => (letterInUsed.includes(letter) ? letter : ' _ '));
    }
    
    render() {
        
        const { word, score, gameState, lettersUsedAfter } = this.state;
        
        return (
            
            <div className="App">
            
                <div>
            
                    <DisplayScore
                        score={score}
                    />
            
                    <p>
                        {word}
                    </p>

                    <DisplayButton
                    onClick={this.handleButtonClick}
                    buttonState={this.buttonState()}
                    />

                    <DisplayGameState
                            displayGameState={this.displayGameState()}
                            gameState = {gameState}
                    />

                    <DisplayWord
                            displayWord={gameState !== "stop" ? this.hiddenWord(lettersUsedAfter) : false} 
                            clue= {words[chosenWord].clue}
                            wordlength={word.length}
                            gameState={gameState}
                    />
                                
                    <DisplayNumberTest
                        gameState = {gameState}
                        chance = {this.state.chance}
                    />
                
                
                </div>


                <div id="lettersList">
                    {letters.map((letter, index) => (
                        <DisplayLetters
                            letter={letter}
                            key={index}
                            onClick={this.handleLetterClick}
                            verified={this.verifiedLetters(letter)}
                        />
                    ))}

                </div>

            </div>
            
        )
    }
}

export default App;
