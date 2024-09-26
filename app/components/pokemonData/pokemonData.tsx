// pokemonData.tsx (Make sure it's not inside a 'use client' file)

// This is a server component
import React from "react";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import styles from "./pokemonData.module.css";
import PokemonAbilities from "../pokemonAbilities/pokemonAbilities";
import PokemonStats from "../pokemonStats/pokemonStats";
const PokemonData = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	// Fetch the data server-side
	let res;
	if (searchParams.pokemon) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${searchParams.pokemon}`
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}`);
	}

	const data = await res.json();
	// Render server-side fetched data
	return (
		<div className={styles.pokemonData}>
			<PokemonAbilities abilities={data.abilities} />
			<PokemonStats stats={data.stats} />
		</div>
	);
};

export default PokemonData;
