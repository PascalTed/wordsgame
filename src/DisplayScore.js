import React from 'react'; 
import './DisplayScore.css';

const DisplayScore = function (props) {

    return (
        <div id="score">
            Score : {props.score}   
        </div>
    )
};

export default DisplayScore;