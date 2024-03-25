import { Pokemon } from "./Pokemon.js";

export class PokedexController {

    constructor() {
        this.pokemonName = document.querySelector(".pokemon__name");
        this.pokemonNumber = document.querySelector(".pokemon__number");
        this.pokemonImage = document.querySelector(".pokemon__image");
        this.form = document.querySelector(".form");
        this.input = document.querySelector(".input__search");
        this.buttonPrev = document.querySelector(".btn-prev");
        this.buttonNext = document.querySelector(".btn-next");
        this.pokemonIndex = 1;
    }
    
    init() {
        this.bindElements();
        this.findPokemon(this.pokemonIndex);
    }

    findPokemon(search) {
        this.pokemonName.innerHTML = 'Loading...';
        this.pokemonNumber.innerHTML = '';
        this.pokemonImage.src = './images/loading.gif';

        fetch(`https://pokeapi.co/api/v2/pokemon/${search}`).then(response => {
            if (response.status !== 200) return null;
            return response.json();
        }).then(data => {
            this.renderPokemon(data);
        });
    }

    bindElements() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.findPokemon(this.input.value.toLowerCase());
        });

        this.buttonPrev.addEventListener("click", () => {
            if (this.pokemonIndex > 1) {
                this.pokemonIndex -= 1;
                this.findPokemon(this.pokemonIndex);
            }
        });

        this.buttonNext.addEventListener("click", () => {
            this.pokemonIndex += 1;
            this.findPokemon(this.pokemonIndex);
        });
    }

    renderPokemon(data) {
        if (!data) return this.renderNotFound();

        const pokemon = new Pokemon(data);
        this.pokemonName.innerHTML = pokemon.name;
        this.pokemonNumber.innerHTML = pokemon.id;
        this.pokemonImage.src = pokemon.getValidImage();

        this.input.value = "";
        this.pokemonIndex = pokemon.id;
    }

    renderNotFound() {
        this.pokemonName.innerHTML = "Not Found";
        this.pokemonNumber.innerHTML = "";
        this.pokemonImage.src = "./images/not-found.png";
        this.input.value = "";
    }
}