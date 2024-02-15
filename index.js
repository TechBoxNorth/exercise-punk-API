
const container = document.querySelector('.container');
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('show-random-btn')){
        getRandomBeer();
    }

    if(e.target.classList.contains('home')){
        document.querySelector('.section-random-beer').style.display = 'inherit';
        document.querySelector('.section-beer-info').style.display = 'none';
        document.querySelector('.section-beer-search').style.display = 'none';
    }

    if(e.target.classList.contains('see-more-btn')){
        document.querySelector('.section-random-beer').style.display = 'none';
        document.querySelector('.section-beer-info').style.display = 'flex';
        document.querySelector('.section-beer-search').style.display = 'none';
    }

    if(e.target.classList.contains('search')){
        document.querySelector('.section-random-beer').style.display = 'none';
        document.querySelector('.section-beer-info').style.display = 'none';
        document.querySelector('.section-beer-search').style.display = 'inherit';
    }
});

const searchString = document.getElementById('search-string');
const searchForm = document.getElementById('search-form');
const searchQuery = 'https://api.punkapi.com/v2/beers?beer_name=';
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const queryString = searchQuery + searchString.value + '&page=1&per_page=10';
    console.log(queryString);
    searchingForBeers(queryString);
});

async function searchForBeer(queryString){
    try {
        let response = await fetch(queryString);
        let data = await response.json();
        return data;
    } catch (error) {
       console.log('Error: ' + error);
    }
}

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
        console.log(data[0]);
        document.querySelector('.beer-name').innerText = setBeerName(data);
        document.querySelector('.bottle-name').innerText = setBeerName(data);
        document.querySelector('.b-img').src = setBeerImage(data);
        document.querySelector('.info-img').src = setBeerImage(data);
        setHops(data);
        setMalts(data);
        setYeast(data);
        setDescription(data);
        setAbv(data);
        setFoodPairing(data);
        setBrewersTips(data);
    })
}

function searchingForBeers(queryString){
    const searchList = document.querySelector('.search-list');
    searchForBeer(queryString).then((data) => {
        console.log(data);
        for(let i = 0; i < data.length; i++){
            let p = document.createElement('p');
            p.id = data[i].id;
            p.name = data[i].name;
            p.innerText = p.name;
            if(i % 2 === 0){
                p.style.backgroundColor = 'whitesmoke';
                p.style.color = 'grey';
            } else {
                p.style.backgroundColor = 'grey';
                p.style.color = 'whitesmoke';
            }
            p.classList.add('hover')
            p.classList.add('list-beer')
            searchList.appendChild(p);
        }
    });
}


function setBeerName(data){
    return data[0].name;
}

function setDescription(data){
    const description = document.querySelector('.description');
    let p = document.createElement('p');
    p.innerText = data[0].description;
    description.appendChild(p);
}

function setBeerImage(data){
    return data[0].image_url;
}

function setHops(data){
    const hops = document.querySelector('.hops');
    for(let i = 0; i < data[0].ingredients.hops.length; i++){
        console.log(data[0].ingredients.hops[i].name);
        let p = document.createElement('p');
        p.innerText = data[0].ingredients.hops[i].name;
        hops.appendChild(p);
    }
}

function setMalts(data){
    const malts = document.querySelector('.malts');
    for(let i = 0; i < data[0].ingredients.malt.length; i++){
        let p = document.createElement('p');
        p.innerText = data[0].ingredients.malt[i].name;
        malts.appendChild(p);
    }
}

function setYeast(data){
    const yeast = document.querySelector('.yeast');
    let p = document.createElement('p');
    p.innerText = data[0].ingredients.yeast;
    yeast.appendChild(p);
}

function setAbv(data){
    const abv = document.querySelector('.abv');
    let p = document.createElement('p');
    p.innerText = data[0].abv + '%';
    abv.appendChild(p);
}

function setFoodPairing(data){
    const foodPairing = document.querySelector('.food-pairing');
    let p = document.createElement('p');
    p.innerText = data[0].food_pairing;
    foodPairing.appendChild(p);
}

function setBrewersTips(data){
    const brewersTips = document.querySelector('.brewers-tips');
    let p = document.createElement('p');
    p.innerText = data[0].brewers_tips;
    brewersTips.appendChild(p);
}

getRandomBeer();