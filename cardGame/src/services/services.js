export const generateString = (inputString) => {
    console.log("generateString a " + inputString);
    var obj =
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: inputString})
        };

    return fetch('http://localhost:8000/startGame', obj)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            // console.log(res.shuffleResult);
            return res.shuffleResult;
        })
        .catch((error) => {
            alert('failed to load', error);
        });
};

export const testGetDeveloperInfo = () => {
    console.log("jojo is testing api here");
    // return fetch('https://jsonplaceholder.typicode.com/users')
    return fetch('http://localhost:8000/developerInfo')
        .then((response) => {
            return response.json();

        }).then((res) => {
            return res;
        })

        .catch((e) => {
            alert(`failed to reach server: ${e}`);
        });
};

