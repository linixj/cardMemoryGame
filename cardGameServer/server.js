// var fs = require('fs')
// var path = require('path')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({   //to support URL-encoded bodies
    extended: true
}));

app.use(bodyParser.json());  //to support JSON-encoded bodies

app.use(function (req, res, next) {
    //website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATH');

    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    //Pass to next layer of middleware
    next();
});


app.get('/name', function (req, res) {
    console.log("localhost8000 is working");
    res.send("name is jojo");
});

app.get('/developerInfo', function (req, res) {
    console.log("localhost8000 is working");
    res.send(JSON.stringify(developerInfo));
});

app.post('/startGame', (req, res) => {
    // console.log("server here");
    // console.log(req.body);
    generateString(req.body.text, res)
});



app.listen(8000, () => {
    console.log("Now listening at port 8000")
});


function generateString(inputString, res) {
    let newCharacters = inputString + inputString;
    newCharacters = shuffle(newCharacters.split('')).join('');

    res.send(JSON.stringify({
        "shuffleResult": newCharacters
        //"status": "success"
    }))
}


function shuffle(o) {
    for (var i = o.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = o[i];
        o[i] = o[j];
        o[j] = tmp;
    }
    return o
}

var scoreList =[{
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "score": {
        "moves": "12",
        "time": "32s",
        "characters": "devil",

    },
},
    {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "score": {
            "moves": "10",
            "time": "12s",
            "characters": "good",
        },
    },
];

var developerInfo=[
    {
        "name": "Jojo Lee",
        "email": "nikkileenee@gmail.com",
        "major": "Information System"
    }
];