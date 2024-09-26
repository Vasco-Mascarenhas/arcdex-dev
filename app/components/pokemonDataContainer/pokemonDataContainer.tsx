// Make sure not to include this line here

import React from "react";
import pokemons from "../../data/pokemons.json";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonDataContainer.module.css";
import PokemonData from "../pokemonData/pokemonData";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";

const PokemonDataContainer = ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	const pokemon = searchParams.pokemon
		? pokemons[searchParams.pokemon - 1]
		: pokemons[1];

	console.log(searchParams.pokemon);
	return (
		<div className={styles.pokemonDataContainer}>
			<PokemonPreview pokemon={pokemon} />
			<PokemonData searchParams={searchParams} />
		</div>
	);
};

export default PokemonDataContainer;
