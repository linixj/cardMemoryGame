import React from 'react';


const Score = ({
    characters,
    startGame,
    moves,
    currentTimer,
    score,
    list
}) => {

    const showList = [];
    // const list =[];
    // list.push("Moves:"+moves+"; Time using:" + currentTimer + "s" + "; Characters:" + characters);
    for (let i = 0; i < list.length; i++) {
        showList.push(<li key={i}>{list[i]}</li>)
    }

    return (
        <div >
            <h1 className="score">Score Section</h1>
            <h3 className="scoreMessages">Congratulation!
                You memorized {characters} only used {moves} moves in {currentTimer}s!
                Go you!
            </h3>
            <button className="startOver" onClick={startGame}>Play Again?</button>
            <div className="s1">
                This round: {score}
            </div>
            <div>------------------------------------------------------------------</div>
            <form className="s2">
                <ul>{showList}</ul>
            </form>
        </div>

    )
};

export default Score;