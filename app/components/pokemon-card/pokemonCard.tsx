"use client";

import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React from "react";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonCard.module.css";
import { EvolutionDetail } from "@/app/interfaces/pokemons/pokemonEvolution";
import Link from "next/link";

interface PokemonCardProps {
	pokemon: PokemonShort;
	evolutionDetails?: EvolutionDetail[]; // Optional prop for evolution details
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
	return (
		<Link
			className={styles.card}
			prefetch={true}
			href={{ pathname: `/pokedex/${pokemon.name}` }}
		>
			<PokemonPreview pokemon={pokemon} />
		</Link>
	);
};

export default PokemonCard;
