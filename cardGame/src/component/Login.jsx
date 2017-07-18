import React from 'react';


const Login = ({
    onGoogleSubmit,
    developers
}) => {
    // // const developer=developers.map(
    // //     (info,index)=>(
    // //         <li key={index}>
    // //             {info}
    // //         </li>
    // //     )
    // // );
    // let developer = []
    // for(let i = 0; i < developers.length; i++) {
    //     developer.push(<li key={i}>
    //         {developers.email}
    //     </li>);
    // }
    // // console.log("developer is here");
    // console.log(developer);
    // console.log("--------");
    //  console.log(developers);
    return (

        <form className="login">
            <h5 className="introduction">
                Rules:
                <br/>
                Enter the characters you want to learn.
                <br/>
                Flip the tiles and try to match them up in pairs.
                <br />
                Try to complete the game in as few moves and as quick as possible!
            </h5>
            <h3 className="messages">Please login in using your Google account here:</h3>


            <button className="loginBtn loginBtn--google" onClick={onGoogleSubmit}>
                Login with Google
            </button>

            <div className="developer-info">
                <p>{developers.name}</p>
                <p>{developers.email}</p>
            </div>


        </form>

    )
};

export default Login;