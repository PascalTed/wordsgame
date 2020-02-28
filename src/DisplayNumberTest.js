import React from 'react';
import './DisplayNumberTest.css';

const DisplayNumberTest = function (props) {

	
        
        if (props.gameState === "start" || props.gameState === "initStart" || props.gameState === "addLetter" || props.gameState === "découvrir mot" || props.gameState === "mot découvert" || props.gameState === "mot trouvé") {
            return (<p>il vous reste <span id="nbTest">{props.chance}</span> essais</p>);
        }
        else if (props.gameState === "perdu"  || props.gameState === "mot découvert et fini") {
            return (<p>"Vous avez utilisé tous les essais"</p>);
        } else {
            return null;
        }
};


export default DisplayNumberTest;