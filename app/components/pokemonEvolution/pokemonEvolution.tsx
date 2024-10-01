import React from "react";
import styles from "./pokemonEvolution.module.css";
import {
	PokemonEvol,
	EvolutionChainLink,
	EvolutionDetail,
} from "@/app/interfaces/pokemons/pokemonEvolution";
import { getPokemon } from "@/app/utility/getid";

import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import EvolutionDetails from "./evolutionDetails/evolutionDetails";

interface Evolution {
	evol: {
		url: string;
	};
}

const PokemonEvolution = async ({ evol }: Evolution) => {
	const res = await fetch(evol.url, {
		next: { revalidate: 0 }, // Cache indefinitely
	});
	const data: PokemonEvol = await res.json();

	// Function to recursively extract all evolutions with their evolution details
	const extractEvolutions = (
		chain: EvolutionChainLink
	): { pokemon: PokemonShort; evolution_details: EvolutionDetail[] }[] => {
		const evolutions: {
			pokemon: PokemonShort;
			evolution_details: EvolutionDetail[];
		}[] = [];

		const traverseChain = (currentChain: EvolutionChainLink) => {
			if (!currentChain) return;

			// Get the Pokémon from the current chain's species URL
			const pokemonId = getPokemon(currentChain.species.url);
			if (pokemonId) {
				evolutions.push({
					pokemon: pokemonId,
					evolution_details: currentChain.evolution_details, // Pass evolution details here
				});
			}

			// Recursively process further evolutions
			currentChain.evolves_to.forEach((nextChain: EvolutionChainLink) => {
				traverseChain(nextChain);
			});
		};

		traverseChain(chain);
		return evolutions;
	};

	const evolutions = extractEvolutions(data.chain);

	if (evolutions.length == 1) return;
	return (
		<div className={styles.pokemonEvolution}>
			<h2>Evolution</h2>
			<div className={styles.evolutions}>
				{evolutions.map(({ pokemon, evolution_details }) => (
					<EvolutionDetails
						key={pokemon.id}
						pokemon={pokemon}
						evolutionDetails={evolution_details}
					/>
				))}
			</div>
		</div>
	);
};

export default PokemonEvolution;
