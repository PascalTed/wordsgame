import React from 'react'; 
import './DisplayWord.css';

const DisplayWord = function (props) {
	if (props.gameState === "stop") {
		return null
	}
    return (
    	<div>
	      	<p id= "game-word">
				 {props.displayWord}
	      	</p>
        
	    	<p id= "game-indice">
	    	(Indice : {props.clue})
	    	</p>


      	</div>
    )
};

export default DisplayWord;