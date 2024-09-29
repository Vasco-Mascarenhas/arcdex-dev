// Make sure not to include this line here

import React from "react";
import pokemons from "../../data/pokemons.json";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonDataContainer.module.css";
import PokemonData from "../pokemonData/pokemonData";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import ExpandedButton from "../expandedButton/expandedButton";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
const PokemonDataContainer = ({
	pokemonRes,
}: {
	pokemonRes: PokemonResponse;
}) => {
	const pokemon: PokemonShort | undefined = pokemonRes.id
		? pokemons.find((p) => p.id === Number(pokemonRes.id))
		: pokemons[0];

	return (
		<div className={styles.pokemonDataContainer}>
			<ExpandedButton />
			{pokemon ? <PokemonPreview pokemon={pokemon} /> : <div>error</div>}

			<PokemonData pokemonRes={pokemonRes} />
		</div>
	);
};

export default PokemonDataContainer;
