import { typeOptions } from "@/app/constants/typeOptions";
import React, { Suspense } from "react";
import Ordering from "../ordering/ordering";
import PokemonContainer from "../pokemon-container/pokemonContainer";
import styles from "./pokedexContainer.module.css";
import pokemons from "../../data/pokemons.json";
const PokedexContainer = () => {
	return (
		<>
			<aside className={styles.pokemonData}></aside>
			<section className={styles.pokemonSection}>
				<>
					<Suspense fallback={<div>loading...</div>}>
						<Ordering options={typeOptions} placeholder="Search for Pokemon!" />
						<PokemonContainer pokemons={pokemons} />
					</Suspense>
				</>
			</section>
		</>
	);
};

export default PokedexContainer;
