import React from 'react';
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
    
    render() {
        
        const { word } = this.state;
        
        return (
            <section>
                {word}
            </section>
        )
    }
}

export default App;
