import React from "react";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import styles from "./pokemonData.module.css";
import PokemonAbilities from "../pokemonAbilities/pokemonAbilities";
import PokemonStats from "../pokemonStats/pokemonStats";
import PokemonInfo from "../pokemonInfo/pokemonInfo";
const PokemonData = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	let res;
	if (searchParams.pokemon) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${searchParams.pokemon}`
		);
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
