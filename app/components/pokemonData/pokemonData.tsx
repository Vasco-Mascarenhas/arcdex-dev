import React from "react";
import styles from "./pokemonData.module.css";
import PokemonStats from "../pokemonStats/pokemonStats";
import PokemonInfo from "../pokemonInfo/pokemonInfo";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import pokemons from "@/app/data/pokemons.json";
interface PokemonDataProps {
	pokemonRes: PokemonResponse;
}

const PokemonData = async ({ pokemonRes }: PokemonDataProps) => {
	let res;
	if (pokemonRes) {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonRes.id}`, {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}`, {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	}

	const data = await res.json();

	const pokemon: PokemonShort | undefined = pokemonRes.id
		? pokemons.find((p) => p.id === Number(data.id))
		: pokemons[0];
	console.log(data.id);
	return (
		<div className={styles.pokemonData}>
			{pokemon ? <PokemonPreview pokemon={pokemon} /> : <div>error</div>}
			<PokemonStats stats={data.stats} />
			<PokemonInfo
				height={data.height}
				weight={data.weight}
				base_experience={data.base_experience}
				types={data.types}
			/>
		</div>
	);
};

export default PokemonData;
