import React from "react";
import { typeOptions } from "../constants/typeOptions";
import styles from "./page.module.css";
import Ordering from "../components/ordering/ordering";
//import PokemonDataContainer from "../components/pokemonDataContainer/pokemonDataContainer";
import PokemonContainer from "../components/pokemon-container/pokemonContainer";
import pokemons from "../data/pokemons.json";
import { SearchParams } from "../interfaces/searchParams/searchPara";
import PokemonExpanded from "../components/pokemonExpanded/pokemonExpanded";
import { PokemonResponse } from "../interfaces/pokemons/pokemonResponse";
import PokemonDataContainer from "../components/pokemonDataContainer/pokemonDataContainer";

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
	let res;
	if (searchParams.pokemon) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${searchParams.pokemon}`
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}`);
	}

	const data: PokemonResponse = await res.json();

	return (
		<div className={styles.pokedex}>
			<aside className={styles.pokemonData}>
				<PokemonDataContainer pokemonRes={data} />
			</aside>
			<section className={styles.pokemonSection}>
				{searchParams.expanded ? (
					<PokemonExpanded pokemonRes={data} />
				) : (
					<>
						<Ordering options={typeOptions} placeholder="Search for Pokemon!" />
						<PokemonContainer pokemons={pokemons} />
					</>
				)}
			</section>
		</div>
	);
};

export default Page;
