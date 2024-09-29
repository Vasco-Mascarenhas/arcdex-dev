import React from "react";
import styles from "./pokemonData.module.css";
import PokemonAbilities from "../pokemonAbilities/pokemonAbilities";
import PokemonStats from "../pokemonStats/pokemonStats";
import PokemonInfo from "../pokemonInfo/pokemonInfo";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
const PokemonData = async ({ pokemonRes }: { pokemonRes: PokemonResponse }) => {
	let res;
	if (pokemonRes) {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonRes.id}`);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}`);
	}

	const data = await res.json();

	return (
		<div className={styles.pokemonData}>
			<PokemonAbilities abilities={data.abilities} />
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
