import React from 'react'; 
import './App.css';

const DisplayWord = function (props) {
	if (props.gameState === "stop" || props.gameState === "perdu") {
		return null
	}
    return (
    	<div>
	    	{(props.gameState !== "mot trouvé" && props.gameState !== "Fini") && <p>
	    	Mot de {props.wordlength} lettres
	    	</p>}

	    	{(props.gameState !== "mot trouvé" && props.gameState !== "Fini") && <p>
	    	Indice : {props.clue}
	    	</p>}
	      	<p className={props.word}>
				 {props.displayWord}
	      	</p>

      	</div>
    )
};

export default DisplayWord;