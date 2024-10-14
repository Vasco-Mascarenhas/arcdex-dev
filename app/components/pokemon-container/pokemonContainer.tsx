import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import styles from "./pokemonContainer.module.css";
import React from "react";
import PokemonCard from "../pokemon-card/pokemonCard";

interface PokemonContainerProps {
	searchParams: SearchParams;
	pokemons: PokemonResponse[];
}

const PokemonContainer = ({
	searchParams,
	pokemons,
}: PokemonContainerProps) => {
	console.log(searchParams);
	console.log(pokemons);
	return (
		<div className={styles.pokemons}>
			{pokemons.map((pokemon: PokemonResponse) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default PokemonContainer;
