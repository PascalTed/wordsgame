import React from 'react';
import DisplayButton from './DisplayButton';
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
    
    render() {
        
        const { word } = this.state;
        
        return (
            
            <div className="App">
                <p>
                    {word}
                </p>
            
                <DisplayButton
                onClick={this.handleButtonClick}
                buttonState={this.buttonState()}
                />

            </div>
            
        )
    }
}

export default App;
