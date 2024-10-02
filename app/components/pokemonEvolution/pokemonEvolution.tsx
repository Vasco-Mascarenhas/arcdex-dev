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

interface EvolutionProps {
	evol: {
		url: string;
	};
	currentPokemon: number;
}

const PokemonEvolution = async ({ evol, currentPokemon }: EvolutionProps) => {
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
	const currPokemon = evolutions.find(
		(evol) => evol.pokemon.id === currentPokemon
	);
	console.log(currPokemon?.evolution_details);
	if (evolutions.length == 1) return;
	return (
		<div className={styles.pokemonEvolution}>
			<h2>Evolution</h2>
			<div className={styles.container}>
				{currPokemon?.evolution_details != null &&
				currPokemon.evolution_details.length > 0 ? (
					currPokemon.evolution_details.map((evolution, index) => (
						<div
							className={styles.details}
							key={currPokemon.pokemon.name + index}
						>
							{currPokemon?.evolution_details[0].trigger && (
								<div className={styles.detail} key={evolution.trigger.name}>
									<h4>Trigger</h4>
									<span>{evolution.trigger.name.replace("-", " ")}</span>
								</div>
							)}
							{evolution.gender && (
								<div className={styles.detail}>
									<h4>Gender</h4>
									<span>{evolution.gender == 1 ? "Male" : "Female"}</span>
								</div>
							)}
							{evolution.held_item && (
								<div className={styles.detail}>
									<h4>Held Item</h4>
									<span>{evolution.held_item.name.replace("-", " ")}</span>
								</div>
							)}
							{evolution.item && (
								<div className={styles.detail}>
									<h4>Item</h4>
									<span>{evolution.item.name.replace("-", " ")}</span>
								</div>
							)}
							{evolution.known_move && (
								<div className={styles.detail}>
									<h4>Move Known</h4>
									<span>{evolution.known_move.name.replace("-", " ")}</span>
								</div>
							)}
							{evolution.known_move_type && (
								<div className={styles.detail}>
									<h4>Move Type Known</h4>
									<span>
										{evolution.known_move_type.name.replace("-", " ")}
									</span>
								</div>
							)}
							{evolution.location && (
								<div className={styles.detail}>
									<h4>Location</h4>
									<span>{evolution.location.name.replace("-", " ")}</span>
								</div>
							)}
							{evolution.min_affection && (
								<div className={styles.detail}>
									<h4>Minimum Affection</h4>
									<span>{evolution.min_affection}</span>
								</div>
							)}
							{evolution.min_beauty && (
								<div className={styles.detail}>
									<h4>Minimum Beauty</h4>
									<span>{evolution.min_beauty}</span>
								</div>
							)}
							{evolution.min_happiness && (
								<div className={styles.detail}>
									<h4>Minimum Happiness</h4>
									<span>{evolution.min_happiness}</span>
								</div>
							)}
							{evolution.min_level && (
								<div className={styles.detail}>
									<h4>Minimum Level</h4>
									<span>{evolution.min_level}</span>
								</div>
							)}
							{evolution.needs_overworld_rain && (
								<div className={styles.detail}>
									<h4>Needs Overworld Rain</h4>
									<span>{evolution.needs_overworld_rain}</span>
								</div>
							)}
							{evolution.party_species && (
								<div className={styles.detail}>
									<h4>Party Species</h4>
									<span>{evolution.party_species.replace("-", " ")}</span>
								</div>
							)}
							{evolution.party_type && (
								<div className={styles.detail}>
									<h4>Party Type</h4>
									<span>{evolution.party_type.replace("-", " ")}</span>
								</div>
							)}
							{evolution.relative_physical_stats && (
								<div className={styles.detail}>
									<h4>Relative Physical Stats</h4>
									<span>{evolution.relative_physical_stats}</span>
								</div>
							)}
							{evolution.time_of_day && (
								<div className={styles.detail}>
									<h4>Time Of Day</h4>
									<span>{currPokemon.evolution_details[0].time_of_day}</span>
								</div>
							)}
							{evolution.trade_species && (
								<div className={styles.detail}>
									<h4>Trade Species</h4>
									<span>{evolution.trade_species}</span>
								</div>
							)}

							{evolution.turn_upside_down && (
								<div className={styles.detail}>
									<h4>Turn Console Upside Down</h4>
									<span>
										{currPokemon.evolution_details[0].turn_upside_down === true
											? "Yes"
											: "No"}
									</span>
								</div>
							)}
						</div>
					))
				) : (
					<div className={styles.details}>
						<div className={styles.detail}>
							Has no evolution details or is the base pokemon of the evolution
							chain.
						</div>
					</div>
				)}
			</div>

			<h3>Evolution Chain</h3>
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
