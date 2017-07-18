import React, {Component} from 'react';
import WordForm from './component/WordForm';
import Board from './component/Board';
import Status from './component/Status';
import Score from './component/Score';
import firebase from 'firebase';
import 'firebase/database';
import Login from './component/Login'
import {generateString, testGetDeveloperInfo} from'./services/services'


class App extends Component {

    constructor(props) {
        super(props);
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyA4PSQfQ3XMaSVZ-Pg5TcnpphiKd5CN3A4",
            authDomain: "cardgame-8e2db.firebaseapp.com",
            databaseURL: "https://cardgame-8e2db.firebaseio.com",
            projectId: "cardgame-8e2db",
            storageBucket: "cardgame-8e2db.appspot.com",
            messagingSenderId: "721391960120"
        };
        this.app = firebase.initializeApp(config);
        this.database = this.app.database();
        this.databaseRef = this.database.ref().child('react-cardGame');//root url


        this.state = {
            characters: undefined,
            error: undefined,
            gameOver: false,
            numMoves: 0,
            messages: [],
            tiles: [],
            mode: 3,
            timer: 0,
            currentTimer: [],
            score: [],
            list: [],
            user: null,
            developers: []
        };
        this.timedCount();

    };

    componentWillMount(){
        let self = this;
        testGetDeveloperInfo()
            .then((info) =>{
                //console.log("I am testing get request");
                console.log(info[0]);
                let temp = info[0];
                return temp;
                // console.log(this.state.developers);
            })
            .then(function(temp){
                self.setState({
                    developers: temp
                })
            })
    };


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //console.log(user);
                this.setState({user: user});
            } else {
                this.setState({user: null});
            }
        })
    }


    //Handle Google login
    handleGoogleAuth() {
        const provider = new firebase.auth.GoogleAuthProvider();
        console.log(provider);
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} is signing in...`))
            .then(
                this.setState({
                    mode: 0
                })
            )
            .catch(error => (
                this.setState({
                    user:null,
                    mode:3
                }))
            );


    }


    startGame() {
        this.setState({
            characters: undefined,
            error: undefined,
            gameOver: false,
            numMoves: 0,
            messages: [],
            tiles: [],
            mode: 0,
            timer: 0,
            currentTimer: 0
        });

    }

    // shuffle(o) {
    //     for (let j, x, i = o.length; i; j = parseInt(Math.random() * i),
    //         x = o[--i], o[i] = o[j], o[j] = x);
    //     return o;
    // }

    generateGame() {
        console.log("here");
        let insertTiles = [];
        let userInputString = this.state.characters;
        //let newCharacters = userInputString + userInputString;
        //newCharacters = this.shuffle(newCharacters.split('')).join('');
        generateString(userInputString)
            .then((newCharacters) => {
            for (let i = 0; i < newCharacters.length; i++) {
                insertTiles.push(
                    {
                        'storedCharacter': newCharacters[i],
                        'isFlipped': false,
                        'isMatch': false,
                    });
            }
        })
            .then(
                this.setState({
                    tiles: insertTiles,
                    mode: 1,
                    timer: 0
                })
            );

    }

    timedCount() {
        setInterval(
            this.timer.bind(this), 1000);
    }

    timer() {
        let Timing = this.state.timer;
        Timing++;
        this.setState({
            timer: Timing
        })
    }

    setError(msg) {
        this.setState({
            error: msg
        });
        setTimeout(this.clearError.bind(this), 1500);
    };

    clearError() {
        this.setState({
            error: ''
        })
    }

    onInputChange(e) {
        this.setState({
                characters: e
            },
        );
    }

    checkCharacters() {
        for (let i = 0; i < this.state.characters.length - 1; i++) {
            for (let j = i + 1; j < this.state.characters.length; j++) {
                if (this.state.characters[i] === this.state.characters[j]) {
                    return false;
                }
            }
        }
        return true;
    };

    submitCharacters() {
        if (this.state.characters === undefined
            || this.state.characters.length < 3
            || this.checkCharacters() === false)
        {
            this.setError('Please enter at least 3 different characters!');
        } else if (this.state.characters.length >= 10) {
            this.setError('Please enter no more than 10 different characters!');
        } else {
            this.generateGame();
            this.setState({
                messages: 'chooseTile',
                mode: 1
            });
        }
    };


    clickHandler(e, index) {
        const currentTiles = this.state.tiles;
        currentTiles[index].isFlipped = true;
        this.setState({
            tiles: currentTiles,
            messages: 'findMate',
            mode: 1
        });

        let index0 = -1;
        let index1 = -1;
        let count = 0;
        for (let i = 0; i < currentTiles.length; i++) {
            if (currentTiles[i].isMatch === false && currentTiles[i].isFlipped === true) {
                if (index0 === -1) {
                    index0 = i;
                } else if (index1 === -1) {
                    index1 = i;
                }
                count++;
            }
        }

        if (count === 2) {
            setTimeout(function () {
                console.log("delay function");
                this.compareTile(index0, index1, currentTiles);
            }.bind(this), 500);
        }
    };

    compareTile(i, j, currentTiles) {

        if (currentTiles[i].storedCharacter !== currentTiles[j].storedCharacter) {
            currentTiles[i].isFlipped = false;
            currentTiles[j].isFlipped = false;
            this.setState({
                messages: 'wrong',
                mode: 1
            });
        } else {
            currentTiles[i].isMatch = true;
            currentTiles[j].isMatch = true;
            this.setState({
                messages: 'foundMate',
                mode: 1
            });
        }
        this.updateTiles(currentTiles);
        this.gameCounterPlusOne();
        this.isGameOver(currentTiles);
    };

    updateTiles(currentTiles) {
        this.setState({
            tiles: currentTiles,
            mode: 1
        });
    };

    isGameOver(currentTiles) {
        let isGameOver = true;
        for (let i = 0; i < currentTiles.length; i++) {
            if (currentTiles[i].isMatch === false) {
                isGameOver = false;
            }
        }

        if (isGameOver) {
            this.setState({
                messages: 'foundAll',
                mode: 1
            });
            this.endGame();
        }
    };

    endGame() {
        this.storeScore();
        let currentTiming = [];
        currentTiming.push(this.state.timer);
        this.setState({
            gameOver: true,
            tiles: [],
            mode: 2,
            currentTimer: currentTiming
        })
    }

    gameCounterPlusOne() {
        let oldMoves = this.state.numMoves;
        oldMoves++;
        this.setState({
            numMoves: oldMoves
        });
    };


    storeScore() {
        let scores = [];
        scores.push("Moves: " + this.state.numMoves);
        scores.push("; Time using: " + this.state.timer + "s");
        scores.push("; Characters: " + this.state.characters);
        let curList = this.state.list;
        curList.push(scores);

        this.setState({
            score: scores,
            list: curList
        });

        this.databaseRef.push().set(this.state.list);

    }


    render() {
        return (

            <div className="font-change">
                <h1 className="header"
                    style={{
                        color: 'darkred',
                        marginTop: 0,
                        fontSize: 60,
                    }}>
                    Memory Game
                </h1>

                {this.state.mode === 3 &&
                <Login
                    onGoogleSubmit={this.handleGoogleAuth.bind(this)}
                    error={this.state.error}
                    developers={this.state.developers}
                />
                }

                {this.state.mode === 0 &&
                <WordForm
                    onInputChange={this.onInputChange.bind(this)}
                    generateGame={this.generateGame.bind(this)}
                    onSubmit={this.submitCharacters.bind(this)}
                    error={this.state.error}

                />
                }

                {this.state.mode === 1 &&
                <Status
                    timer={this.state.timer}
                    messages={this.state.messages}
                    moves={this.state.numMoves}
                    user={this.state.user}
                />
                }

                {this.state.mode === 1 &&
                <Board
                    tiles={this.state.tiles}
                    startGame={this.startGame.bind(this)}
                    clickHandler={this.clickHandler.bind(this)}
                />
                }

                {this.state.mode === 2 &&
                <Score
                    characters={this.state.characters}
                    startGame={this.startGame.bind(this)}
                    moves={this.state.numMoves}
                    currentTimer={this.state.currentTimer}
                    score={this.state.score}
                    list={this.state.list}
                />
                }

            </div>

        );
    }
}


export default App;
