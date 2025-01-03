import { EvolutionDetail } from "@/app/interfaces/pokemons/pokemonEvolution";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React from "react";
import styles from "./evolutionDetails.module.css";
import PokemonCard from "../../pokemon-card/pokemonCard";

interface PokemonCardProps {
	pokemon: PokemonShort;
	evolutionDetails?: EvolutionDetail[];
}

const EvolutionDetails = ({ pokemon, evolutionDetails }: PokemonCardProps) => {
	return (
		<div className={styles.evolutionDetails}>
			<div className={styles.detailsImg}>
				<PokemonCard pokemon={pokemon} evolutionDetails={evolutionDetails} />
			</div>
		</div>
	);
};

export default EvolutionDetails;
