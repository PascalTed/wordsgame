import React from 'react';
import './DisplayNumberTest.css';

const DisplayNumberTest = function (props) {

	
        
        if (props.gameState === "start") {
            return (<p>il vous reste {props.chance} essais</p>);
        }
        else if (props.gameState === "perdu") {
            return (<p>"Vous avez utilisé tous les essais"</p>);
        } else {
            return null;
        }
};


export default DisplayNumberTest;