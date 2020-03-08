import React from 'react'; 
import './DisplayScore.css';

const DisplayScore = function (props) {

    return (
        <div id="game-score">
            Score : {props.score}   
        </div>
    )
};

export default DisplayScore;