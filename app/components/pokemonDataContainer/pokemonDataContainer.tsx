import React from "react";
import pokemons from "../../data/pokemons.json";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import { useSearchParams } from "next/navigation";
import styles from "./pokemonData.module.css";
const PokemonDataContainer = () => {
	const searchParams = useSearchParams();
	const searchedPokemon = searchParams.get("pokemon")?.toLowerCase() || "";
	const pokemon = searchedPokemon
		? pokemons[parseInt(searchedPokemon) - 1]
		: pokemons[0];

	return (
		<div className={styles.pokemonData}>
			<PokemonPreview pokemon={pokemon} />
		</div>
	);
};

export default PokemonDataContainer;
