'use strict';

let base = 'https://pokeapi.co/api/v2/pokemon/';


function displayPokemon(jsonData){

    let myHTML = ``;

    myHTML += `<h3>${jsonData.name}</h3>
                <img src="${jsonData.sprites.front_default}">
                <p>type: ${jsonData.types[0].type.name}</p>
                <p>ability: ${jsonData.abilities[0].ability.name}</p>`;

    return myHTML;
    
}


function getPokemon(poke){

    let url = `${base}${poke}`;
    console.log(url);

    fetch(url)
    .then(response=> {
        if(response.ok){ //if the status code returned is between 200-299, then we return the JSONifyed data
            return response.json();
        }
        throw new Error(console.log(response.statusText)); //status text will say ok or failed, i think its a boolean
    })
    .then(pokeData => $('#results').html(displayPokemon(pokeData)) )
    .catch(err => $('#results').html(`Oh NO!!! the pokemon got away, here's what happened: ${err.message}`));
}


function watchForm(){
    $('form').on('submit', event => {
        event.preventDefault();
       let pokemon = $('#search').val();
       pokemon = pokemon.toLowerCase();
       getPokemon(pokemon);
       console.log(pokemon);
    });
}


$(watchForm);