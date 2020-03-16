import React from 'react'; 
import './DisplayWord.css';

const DisplayWord = function (props) {
    
    const verifWord = function (element) {
        if (element === '_' ) {
            return 'd-underscore'
            
        } else if (element === ' '){
            return 'd-space'
            
        }else if (element === '-'){
            return 'd-hyphen'
        
        } else {
            return 'd-letter'
        }
    }
    
    
	if (props.gameState === "stop") {
		return null
	}
    
    const wordInArray = props.displayWord.split('');
        console.log(wordInArray);
    
    return (
        <div>
            <p>
                {wordInArray.map((letter, index) => (
                    
                    <span className ={verifWord(letter)} key={index}>
                        {letter}
                    </span>
                ))}

	      	</p>
        
	    	<p id= "game-indice">
                (Indice : {props.clue})
	    	</p>


      	</div>
    )
};

export default DisplayWord;