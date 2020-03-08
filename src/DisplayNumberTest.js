import React from 'react';
import './DisplayNumberTest.css';

const DisplayNumberTest = function (props) {

    const chance = <span>{props.chance}</span>
    
    switch (props.gameState) {
        
        case "start":
        case "initStart":
        case "addLetter":
        case "découvrir mot":
        case "mot découvert":
        case "mot trouvé":
            return (<p id="game-chance">il vous reste {chance} essais</p>);
        
        case "perdu":
            return (<p id="game-chance">Vous avez utilisé tous les essais</p>);
                    
        case "mot découvert et fini":
            return (<p id="game-chance">il vous restait {chance} essais</p>);
        
        default:
            return null;
    }

};


export default DisplayNumberTest;