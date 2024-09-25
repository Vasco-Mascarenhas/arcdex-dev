import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React from "react";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonCard.module.css";
const PokemonCard = ({ pokemon }: { pokemon: PokemonShort }) => {
	return (
		<div className={styles.card}>
			<PokemonPreview pokemon={pokemon} />
		</div>
	);
};

export default PokemonCard;
