import React from "react";
import styles from "./pokemonEvolution.module.css";
import {
	PokemonEvol,
	EvolutionChainLink,
	EvolutionDetail,
} from "@/app/interfaces/pokemons/pokemonEvolution";
import { getPokemon } from "@/app/utility/getid";

import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import PokemonCard from "../pokemon-card/pokemonCard";

interface Evolution {
	evol: {
		url: string;
	};
}

const PokemonEvolution = async ({ evol }: Evolution) => {
	const res = await fetch(evol.url);
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
	return (
		<div className={styles.pokemonEvolution}>
			<h4>EVOLUTION DETAILS</h4>
			<div className={styles.evolutions}>
				{evolutions.map(({ pokemon, evolution_details }) => (
					<div key={pokemon.id} className={styles.evolution}>
						<PokemonCard
							pokemon={pokemon}
							evolutionDetails={evolution_details}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default PokemonEvolution;
