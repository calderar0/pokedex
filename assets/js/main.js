let offset = 0;
const limit = 10;
const limitacaoGeracao = 151;
const pokeList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;


function convertPokemon(pokemon) {
    return ` 
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
     `
}


function loadPokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const novoHTMl = pokemons.map(convertPokemon).join('');
        pokeList.innerHTML += novoHTMl; 
    })
}

loadPokemons(offset, limit);


loadMoreButton.addEventListener('click', () =>{
    offset += limit;
    const qtdProx = offset + limit;
    if(qtdProx >= limitacaoGeracao){
        const novoLimite = limitacaoGeracao - offset
        loadPokemons(offset, novoLimite)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemons(offset, limit);
    }
})