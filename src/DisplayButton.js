import React from 'react';
import './DisplayButton.css';

const DisplayButton = function (props) {
    
    return (
        <div id= "game-button" onClick= {() => props.onClick()}>
        	{props.buttonState}
        </div>
    )
};

export default DisplayButton;