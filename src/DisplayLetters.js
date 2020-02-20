import React from 'react';
import './DisplayLetters.css';

const DisplayLetters = function (props) {
	
    return (
        <div className = "centerLetter">
            <div   className="letter"> 
                {props.letter}
            </div>
                  
        </div>
    )
};

export default DisplayLetters;