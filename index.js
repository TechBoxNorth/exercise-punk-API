async function randomBeer(){
    try {
        let response = await fetch('https://api.punkapi.com/v2/beers/random');
        let data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ' + error);
    }
}

function getRandomBeer(){
    randomBeer().then((data) => {
        console.log(data);
    })
}

getRandomBeer();