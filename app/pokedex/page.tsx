"use client";

import React from "react";
import pokemons from "../data/pokemons.json";
import PokemonContainer from "../components/pokemon-container/pokemonContainer";
import { typeOptions } from "../constants/typeOptions";
import styles from "./page.module.css";
import Ordering from "../components/ordering/ordering";
import PokemonDataContainer from "../components/pokemonDataContainer/pokemonDataContainer";
const Page = () => {
	return (
		<div className={styles.pokedex}>
			<aside className={styles.pokemonData}>
				<PokemonDataContainer />
			</aside>
			<section className={styles.pokemonSection}>
				<Ordering options={typeOptions} placeholder="Search for Pokemon!" />
				<PokemonContainer pokemons={pokemons} />
			</section>
		</div>
	);
};

export default Page;
