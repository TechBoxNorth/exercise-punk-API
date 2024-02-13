
const container = document.querySelector('.container');
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('show-random-btn')){
        getRandomBeer();
    }
});

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
        document.querySelector('.beer-name').innerText = data[0].name;
        document.querySelector('.b-img').src = data[0].image_url;
    })
}

getRandomBeer();