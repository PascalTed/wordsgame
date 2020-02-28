import React from 'react'; 
import './DisplayWord.css';

const DisplayWord = function (props) {
	if (props.gameState === "stop") {
		return null
	}
    return (
    	<div>
	      	<p id= "dWord">
				 {props.displayWord}
	      	</p>
        
	    	<p>
	    	(Indice : {props.clue})
	    	</p>


      	</div>
    )
};

export default DisplayWord;