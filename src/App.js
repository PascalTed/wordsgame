import React from 'react';
import DisplayButton from './DisplayButton';
import DisplayScore from './DisplayScore';
import DisplayLetters from './DisplayLetters';
import './App.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const words = [{word :'ELEPHANT', clue: 'pachyderme'}, {word :'SOLEIL', clue: 'étoile'}, {word :'CERISE', clue: 'fruit'}];
let chosenWord = 0;
let letterUsed = [];

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            word : this.generateWord(),
            gameState : "stop",
            score: 0,
            chance: 6
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

        } else if (gameState === "start" && chance > 0) {
            console.log(chance)
            return "Rejouer le mot";

        } else if (gameState === "perdu" || gameState === "Fini") {
            console.log(gameState)
            return "Nouvelle Partie";

        } else if (gameState === "mot trouvé") {
            return "Mot suivant";

        }
    }
    
    handleButtonClick = () => {

        const {gameState, chance} = this.state;
        console.log(gameState)

        if (gameState === "stop") {
            this.setState((prevState, props) => ({
                gameState: prevState.gameState = "start"}));
        } 
    }
    
    handleLetterClick = (e, letter) => {

        const {gameState} = this.state;
        
     
        // Ajouter lettre cliquée et vérifier
        if (gameState === "start") {
            console.log(this.state.gameState)
            if (!letterUsed.includes(letter)) {
            letterUsed = [...letterUsed, letter]      

             } else {
                e.preventDefault();
            console.log(letterUsed)
             }

        //Désactivation du Clique  sur toutes les lettres 
        } else if (gameState === "perdu" || gameState === "stop" || gameState === "mot trouvé" || gameState === "Fini") {
            e.preventDefault();
        }
     
    }
    
    verifiedLetters(letter) {

        const {word} = this.state;

        if(letterUsed.includes(letter) && word.includes(letter)) {
            return 'letterInWord';
        } else if (letterUsed.includes(letter) && !word.includes(letter)) {
            return 'letterNotInWord';
        } else if (this.state.gameState !== "start") {
            return 'letterNotAllowed';
        }
    }
    
    render() {
        
        const { word, score } = this.state;
        
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
