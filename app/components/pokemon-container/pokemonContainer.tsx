import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React from "react";
import styles from "./pokemonContainer.module.css";
import PokemonCard from "../pokemon-card/pokemonCard";
const PokemonContainer = ({ pokemons }: { pokemons: PokemonShort[] }) => {
	return (
		<div className={styles.pokemons}>
			{pokemons.slice(0, 20).map((pokemon: PokemonShort) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default PokemonContainer;
