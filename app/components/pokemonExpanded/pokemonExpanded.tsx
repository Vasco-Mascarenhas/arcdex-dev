import React from "react";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import styles from "./pokemonExpanded.module.css";
import PokemonEvolution from "../pokemonEvolution/pokemonEvolution";
import PokemonLocation from "../pokemonLocation/pokemonLocation";
const PokemonExpanded = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	let res;
	if (searchParams.pokemon) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${searchParams.pokemon}`
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${1}`);
	}
	const data = await res.json();

	return (
		<section className={styles.pokemonExpanded}>
			<PokemonEvolution evol={data.evolution_chain} />
			<PokemonLocation searchParams={searchParams} />
		</section>
	);
};

export default PokemonExpanded;
