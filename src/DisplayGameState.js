import React from 'react';
import './DisplayGameState.css';

const DisplayGameState = function (props) {
	if (props.gameState === "stop" || props.gameState === "start" || props.gameState === "initStart" || props.gameState === "addLetter" || props.gameState === "découvrir mot") {
		return null;
	}
    return (
        <p>
        	{props.displayGameState}
        </p>
    )
};

export default DisplayGameState;