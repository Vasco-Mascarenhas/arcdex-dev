// Make sure not to include this line here

import React from "react";
import styles from "./pokemonDataContainer.module.css";
import PokemonData from "../pokemonData/pokemonData";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
const PokemonDataContainer = ({
	pokemonRes,
}: {
	pokemonRes: PokemonResponse;
}) => {
	return (
		<div className={styles.pokemonDataContainer}>
			<PokemonData pokemonRes={pokemonRes} />
		</div>
	);
};

export default PokemonDataContainer;
