import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React from "react";
import styles from "./pokemonContainer.module.css";
import PokemonCard from "../pokemon-card/pokemonCard";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";

interface PokemonContainerProps {
	pokemons: PokemonShort[];
	searchParams: SearchParams;
}

const PokemonContainer = ({
	pokemons,
	searchParams,
}: PokemonContainerProps) => {
	let filteredPokemons: PokemonShort[] = pokemons;

	if (searchParams.searched) {
		filteredPokemons = pokemons?.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchParams.searched)
		);
	}

	if (searchParams.type) {
		filteredPokemons = filteredPokemons.filter((pokemon) =>
			pokemon.types.some((type) => type.type.name === searchParams.type)
		);
	}
	console.log(searchParams);
	return (
		<div className={styles.pokemons}>
			{filteredPokemons.map((pokemon: PokemonShort) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default PokemonContainer;
