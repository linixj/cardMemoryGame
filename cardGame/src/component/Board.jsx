import React from 'react';
import Tile from './Tile';


const Board = ({
    tiles,
    clickHandler,
    startGame,
}) => {

    const listOfTiles = tiles.map(
        (tile, index) => (
            <Tile
                key={index}
                tile={tile}
                clickHandler={ (e) => {clickHandler(e, index)}}
            />

        )
    );

    return (
        <div className="board">
            <button className="startOver" onClick={startGame}>Start Over</button>
           <br />
            <span/>
            <div className="tile">
            {listOfTiles}
            </div>
            <br />
        </div>

    )
};

export default Board;
