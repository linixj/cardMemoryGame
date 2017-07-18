import React from 'react';


const WordForm = ({
    characters,
    onInputChange,
    onSubmit,
    error
}) => {

    return (
        <div className="wordForm">
            <h5 className="introduction">
                Rules:
                <br/>
                Enter the characters you want to learn.
                <br/>
                Flip the tiles and try to match them up in pairs.
                Try to complete the game in as few moves and as quick as possible!
            </h5>
            <h6 className="introduction">
                Please enter characters you want to memorize here:
            </h6>
            <input
                className="input"
                type='text'
                maxLength='15'
                placeholder="enter some word"
                value={characters}
                onChange={(e)=>onInputChange(e.target.value)}
            />
            <button className="btn btn-warning submit-button" onClick={onSubmit}>Start the Game</button>
            <p className="error">{error}</p>
        </div>

    )
};

export default WordForm;