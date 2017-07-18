import React from 'react';


const Status = ({
    messages,
    moves,
    timer,
    user
}) => {
    var texts={
        chooseTile:'Please choose a card!',
        findMate:'Now we have to find the same one!',
        wrong:'They are not matched.',
        foundMate:'Yes! You found it!',
        foundAll:'Congratulations! You made it!'
    };

    return (
        <div className='status'>
            <img
              alt="this is a pic"
              width="50"
              src={user.photoURL}

            />
            <h3>{user.displayName}</h3>
            <h3 className="display-time">
                Time:{timer}s ; Moves:{moves}
            </h3>
            <h3 className="messages">
                {texts[messages]}
            </h3>

        </div>

    )
};

export default Status;