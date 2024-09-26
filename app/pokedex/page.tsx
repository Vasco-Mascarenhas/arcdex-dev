import React from "react";
import { typeOptions } from "../constants/typeOptions";
import styles from "./page.module.css";
import Ordering from "../components/ordering/ordering";
import PokemonDataContainer from "../components/pokemonDataContainer/pokemonDataContainer";
import PokemonContainer from "../components/pokemon-container/pokemonContainer";
import pokemons from "../data/pokemons.json";
import { SearchParams } from "../interfaces/searchParams/searchPara";

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		<div className={styles.pokedex}>
			<aside className={styles.pokemonData}>
				<PokemonDataContainer searchParams={searchParams} />
			</aside>
			<section className={styles.pokemonSection}>
				<Ordering options={typeOptions} placeholder="Search for Pokemon!" />
				<PokemonContainer pokemons={pokemons} />
			</section>
		</div>
	);
};

export default Page;
