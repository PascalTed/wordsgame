import React from 'react';
import DisplayButton from './DisplayButton';
import DisplayScore from './DisplayScore';
import DisplayLetters from './DisplayLetters';
import DisplayWord from './DisplayWord';
import DisplayGameState from './DisplayGameState';
import DisplayNumberTest from './DisplayNumberTest';
import './App.css';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const words = [{word :'ELEPHANT', clue: 'pachyderme'}, {word :'SOLEIL', clue: 'étoile'}, {word :'CERISE', clue: 'fruit'}, {word :'BILBAO', clue: 'ville d\'Espagne'}, {word :'RAMBO', clue: 'film'}, {word :'PARADOXORNIS', clue: 'oiseau'}];
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

        } else if (gameState === "start" || gameState === "addLetter" || gameState === "initStart" || gameState === "découvrir mot") {
            console.log(chance)
            return "Découvrir le mot";

        } else if (gameState === "perdu" || gameState === "Fini" || gameState === "mot découvert et fini") {
            console.log(gameState)
            return "Nouvelle Partie";

        } else if (gameState === "mot trouvé" || gameState === "mot découvert") {
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
          

        } else if (gameState === "Fini" || gameState === "perdu" || gameState === "mot découvert et fini") {
            chosenWord = 0;
            this.setState({lettersUsed : [], lettersUsedAfter : [], gameState: "initStart", score : 0, chance : 6, word : this.generateWord()});
        }
        
     
    }
    
    
    handleLetterClick = (e, letter) => {

        const {gameState, lettersUsed} = this.state;
        
     
        // Ajouter lettre cliquée et vérifier
        if (gameState === "start" || gameState === "initStart") {
            console.log(this.state.gameState)
            if (!lettersUsed.includes(letter)) {
                     
                this.setState((prevState) => ({
                    gameState: "addLetter", lettersUsed :  [...prevState.lettersUsed, letter]
                }),this.timeToCheckWord);
             }
        }
     
    }
    
    verifiedLetters(letter) {

        const {word, lettersUsed} = this.state;
        //console.log(letterUsed)
        
        if(lettersUsed.includes(letter)) {   

            if (word.includes(letter)) {
                return 'letterInWord';
            
            } else if (!word.includes(letter)) {
                return 'letterNotInWord';   
        
            }
        
            
        }else if (!lettersUsed.includes(letter) && this.state.gameState === "start") {
            return 'noClickLetter'; 
 
            
        }else if (this.state.gameState === "initStart") {
            return 'initLetter';
        
        
        } else if (this.state.gameState !== "start") {
            return 'letterNotAllowed';

        }
    }

    timeToCheckWord = () => {
        console.log("time");
        setTimeout(this.checkWord,2000);
    }

    checkWord = () => {

        const {word, lettersUsed, lettersUsedAfter} = this.state;
        console.log(lettersUsed)
        console.log(this.hiddenWord(lettersUsed))
        
          
        
        let addToScore = 0
        for(let i = 0; i < word.length; i++) {
            if (word[i] === lettersUsed[lettersUsed.length-1]) {
                addToScore += 1
            }
        }
        
        
        if (this.state.gameState === "découvrir mot") {
                
            if ((chosenWord + 1) === words.length) {       
                       this.setState((prevState, props) => ({
                lettersUsedAfter : prevState.lettersUsed ,gameState : prevState.gameState = "mot découvert et fini", score : prevState.score -= 10 
                }));
        
            } else {
                this.setState((prevState, props) => ({
                lettersUsedAfter : prevState.lettersUsed ,gameState : prevState.gameState = "mot découvert", score : prevState.score -= 10 
                }));
            }
        }
        
        
        
        
        //add letter
        if (this.state.gameState === "addLetter"){
        
        

            if (word === this.hiddenWord(lettersUsed)) {
               console.log(chosenWord)
                if ((chosenWord + 1) < words.length) {          
                    
                    this.setState((prevState, props) => ({
                    lettersUsedAfter : prevState.lettersUsed ,gameState : prevState.gameState = "mot trouvé", score : prevState.score += word.length + addToScore
                    }));
                    
                    

                } else {
                    this.setState((prevState, props) => ({
                    lettersUsedAfter : prevState.lettersUsed, gameState : prevState.gameState = "Fini", score : prevState.score += words.length + word.length + addToScore
                    }));
                    
                }
            } else {

                console.log(addToScore)
                if (!word.includes(lettersUsed[lettersUsed.length-1])) {
                    console.log("test")
                    if (this.state.chance === 1) {
                        console.log("test2")
                        this.setState((prevState, props) => ({
                        gameState : "perdu", score : prevState.score - 1, chance : prevState.chance - 1
                        }));
                     } else {
                        this.setState((prevState, props) => ({
                        gameState : "start" ,score : prevState.score - 1, chance : prevState.chance - 1
                        }));
                     }
                } else {
                    this.setState((prevState, props) => ({
                    gameState : "start" ,lettersUsedAfter : prevState.lettersUsed, score : prevState.score + addToScore
                    })); 
                } 
            }
        }
        
    }
    
    calculSuffixNb() {
        
        let a = chosenWord + 1
        if (a === 1 ) {
            return "er"
        } else {
            return "ème";}
        
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

                    <DisplayButton
                    onClick={this.handleButtonClick}
                    buttonState={this.buttonState()}
                    />

                    <DisplayGameState
                            gameState = {gameState}
                            suffixNumber = {this.calculSuffixNb()}
                            wordLength = {words.length}
                            chosenWord={chosenWord}
                    />

                    <DisplayWord
                            displayWord={gameState !== "stop" ? this.hiddenWord(lettersUsedAfter) : false} 
                            clue= {words[chosenWord].clue}
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
