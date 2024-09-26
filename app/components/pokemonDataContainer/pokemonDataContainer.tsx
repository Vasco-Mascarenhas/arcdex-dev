// Make sure not to include this line here

import React from "react";
import pokemons from "../../data/pokemons.json";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonData.module.css";
import PokemonData from "../pokemonData/pokemonData";
//import PokemonData from "../pokemonData/pokemonData"; // Server component
type SearchParams = {
	pokemon?: number; // Optional, as it may not always be present
};

const PokemonDataContainer = ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	//const pokemon = id ? pokemons[parseInt(id) - 1] : pokemons[1];

	/**
	 * 
	 * PokemonPreview pokemon={pokemon} />
			<PokemonData id={pokemon.id} />
	 */

	//console.log(pokemonId);
	//const pokemon = pokemonId ? pokemons[parseInt(pokemonId) - 1] : pokemons[1]
	//const poke = parseInt(pokemonId);
	/**
	 * 
	 * const pokemon = parseInt(searchParams.pokemon)
		? pokemons[parseInt(searchParams)]
		: pokemons[2];

		
	 */

	const pokemon = searchParams.pokemon
		? pokemons[searchParams.pokemon - 1]
		: pokemons[1];

	console.log(searchParams.pokemon);
	return (
		<div className={styles.pokemonData}>
			<PokemonPreview pokemon={pokemon} />
			<PokemonData searchParams={searchParams} />
		</div>
	);
};

export default PokemonDataContainer;
