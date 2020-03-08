import React from 'react';
import './DisplayGameState.css';

const DisplayGameState = function (props) {
    
    const wordLength = props.wordLength
    const wordNumber = props.chosenWord + 1
    const suffixNumber = <sup>{props.suffixNumber}</sup>
     
     console.log(suffixNumber)
     switch(props.gameState) {
   
         case "mot découvert":
            return <p id="game-state">Le {wordNumber}{suffixNumber} mot à découvrir était :</p>
            
         case "mot trouvé":   
            return <p id="game-state">BRAVO !!! vous avez trouvé le {wordNumber}{suffixNumber} mot :</p>
    
         case "mot découvert et fini":
            return <p id="game-state">Le dernier mot à découvrir était :</p>
            
         case "Fini":
           return <p id="game-state">BRAVO !!! vous avez trouvé le dernier mot :</p>
            
         case "perdu":    
            return <p id="game-state">PERDU !!!</p>
             
         case "start":
         case "initStart":
         case "découvrir mot":
         case "addLetter":
            return <p id="game-state">{wordNumber}{suffixNumber} mot</p>
             
         default:
             return <p id="game-state">{wordLength} mot à découvrir</p>
        }
     
 


};

export default DisplayGameState;