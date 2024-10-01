import { PokemonVarietyData } from "@/app/interfaces/pokemons/pokemonVariety";
import React from "react";
import styles from "./pokemonVariety.module.css";
import { getId } from "@/app/utility/getid";
import PokemonCard from "../pokemon-card/pokemonCard";
import pokemons from "../../data/pokemons.json";
const PokemonVariety = ({
	pokemonVariety,
}: {
	pokemonVariety: PokemonVarietyData[];
}) => {
	const matchingPokemons = pokemons.filter((pokemon) =>
		pokemonVariety.some(
			(variety) => Number(getId(variety.pokemon.url)) === pokemon.id
		)
	);

	if (matchingPokemons.length == 1) return;

	return (
		<div className={styles.pokemonVarieties}>
			<h2>Varieties</h2>
			<div className={styles.varieties}>
				{matchingPokemons.slice(1).map((pokemon) => (
					<PokemonCard key={pokemon.name} pokemon={pokemon} />
				))}
			</div>
		</div>
	);
};

export default PokemonVariety;
