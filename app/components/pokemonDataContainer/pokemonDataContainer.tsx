// Make sure not to include this line here

import React from "react";
import pokemons from "../../data/pokemons.json";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonDataContainer.module.css";
import PokemonData from "../pokemonData/pokemonData";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import ExpandedButton from "../expandedButton/expandedButton";

const PokemonDataContainer = ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	const pokemon: PokemonShort | undefined = searchParams.pokemon
		? pokemons.find((p) => p.id === Number(searchParams.pokemon))
		: pokemons[0];

	return (
		<div className={styles.pokemonDataContainer}>
			<ExpandedButton />
			{pokemon ? <PokemonPreview pokemon={pokemon} /> : <div>error</div>}

			<PokemonData searchParams={searchParams} />
		</div>
	);
};

export default PokemonDataContainer;
