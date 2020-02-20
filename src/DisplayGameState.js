import React from 'react';
import './DisplayGameState.css';

const DisplayGameState = function (props) {
	if (props.gameState === "stop" || props.gameState === "start") {
		return null;
	}
    return (
        <p>
        	{props.displayGameState}
        </p>
    )
};

export default DisplayGameState;