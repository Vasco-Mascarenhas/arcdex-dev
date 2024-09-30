import { typeOptions } from "@/app/constants/typeOptions";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import React, { Suspense } from "react";
import Ordering from "../ordering/ordering";
import PokemonContainer from "../pokemon-container/pokemonContainer";
import PokemonExpanded from "../pokemonExpanded/pokemonExpanded";
import styles from "./pokedexContainer.module.css";
import pokemons from "../../data/pokemons.json";
const PokedexContainer = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	let res;
	if (searchParams.pokemon) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${searchParams.pokemon}`,
			{
				next: { revalidate: 0 }, // Cache indefinitely
			}
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}`, {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	}

	const data: PokemonResponse = await res.json();

	return (
		<>
			<aside className={styles.pokemonData}></aside>
			<section className={styles.pokemonSection}>
				{searchParams.expanded ? (
					<Suspense fallback={<div>loading..</div>}>
						<PokemonExpanded pokemonRes={data} />
					</Suspense>
				) : (
					<>
						<Ordering options={typeOptions} placeholder="Search for Pokemon!" />
						<PokemonContainer pokemons={pokemons} />
					</>
				)}
			</section>
		</>
	);
};

export default PokedexContainer;
