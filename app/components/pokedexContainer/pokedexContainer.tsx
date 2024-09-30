import { typeOptions } from "@/app/constants/typeOptions";
import React, { Suspense } from "react";
import Ordering from "../ordering/ordering";
import PokemonContainer from "../pokemon-container/pokemonContainer";
import styles from "./pokedexContainer.module.css";
import pokemons from "../../data/pokemons.json";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import PokemonDataContainer from "../pokemonDataContainer/pokemonDataContainer";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
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
		res = await fetch("https://pokeapi.co/api/v2/pokemon/1", {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	}
	const data: PokemonResponse = await res.json();
	return (
		<>
			<aside className={styles.pokemonData}>
				<Suspense fallback={<div>loading...</div>}>
					<PokemonDataContainer pokemonRes={data} />
				</Suspense>
			</aside>
			<section className={styles.pokemonSection}>
				<>
					<Suspense fallback={<div>loading...</div>}>
						<Ordering options={typeOptions} placeholder="Search for Pokemon!" />
					</Suspense>
					<PokemonContainer pokemons={pokemons} />
				</>
			</section>
		</>
	);
};

export default PokedexContainer;
