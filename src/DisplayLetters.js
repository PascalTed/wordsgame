import React from 'react';
import './DisplayLetters.css';

const DisplayLetters = function (props) {
	
    return (
        <div className = "centerLetter" onClick= {(e) => props.onClick(e,props.letter)}>
            <div   className="letter"> 
                {props.letter}
            </div>
                  
        </div>
    )
};

export default DisplayLetters;