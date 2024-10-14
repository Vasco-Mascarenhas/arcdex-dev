"use client";

import { typeOptions } from "@/app/constants/typeOptions";
import React, { Suspense, useEffect, useState } from "react";
import Ordering from "../ordering/ordering";
import PokemonContainer from "../pokemon-container/pokemonContainer";
import styles from "./pokedexContainer.module.css";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";

const PokedexContainer = ({ searchParams }: { searchParams: SearchParams }) => {
	const rare = ["mythical", "legendary"];
	const [loading, setLoading] = useState(true);
	const [pokemons, setPokemons] = useState([]); // Use state for pokemons

	const fetchPokemons = async () => {
		try {
			const response = await fetch(`/api/pokemons`);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Failed to fetch Pokémon:", error);
			return [];
		}
	};

	useEffect(() => {
		const loadPokemons = async () => {
			setLoading(true); // Start loading
			const data = await fetchPokemons();
			setPokemons(data); // Set the fetched Pokémon
			setLoading(false); // Stop loading
		};

		loadPokemons();
	}, []);

	return (
		<section className={styles.pokemonSection}>
			<Suspense fallback={<div>loading...</div>}>
				<Ordering
					options={typeOptions}
					placeholder="Search Pokemon!"
					rarity={rare}
				/>
			</Suspense>
			{loading ? ( // Use loading state
				<div>Loading...</div>
			) : (
				<PokemonContainer pokemons={pokemons} searchParams={searchParams} />
			)}
		</section>
	);
};

export default PokedexContainer;
