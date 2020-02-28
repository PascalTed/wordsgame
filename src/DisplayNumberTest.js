import React from 'react';
import './DisplayNumberTest.css';

const DisplayNumberTest = function (props) {

	
        
        if (props.gameState === "start" || props.gameState === "initStart" || props.gameState === "découvrir mot" || props.gameState === "mot découvert") {
            return (<p>il vous reste {props.chance} essais</p>);
        }
        else if (props.gameState === "perdu"  || props.gameState === "mot découvert et fini") {
            return (<p>"Vous avez utilisé tous les essais"</p>);
        } else {
            return null;
        }
};


export default DisplayNumberTest;