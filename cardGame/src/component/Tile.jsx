import React from 'react';
import $ from 'jquery';


const Tile = ({
    tile,
    clickHandler,
}) => {
    $('.front').click(function(){
        $('.front').animate({left: '50px', right: '20px'})
    });
    // $('.back').click(function(){
    //     $('.back').animate({right: '50px'})
    // });

    return (
        <div className='brick' onClick={clickHandler}>
            {tile.isFlipped === false &&
            <div className='front'>^_^</div>
            }
            {tile.isFlipped === true &&
            <div className='back' data-play={tile.storedCharacter}>
                {tile.storedCharacter}
            </div>
            }
        </div>

    )
};

export default Tile;