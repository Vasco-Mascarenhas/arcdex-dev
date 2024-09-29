import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import styles from "./pokemonLocation.module.css";
import React from "react";
import { EncounterLocation } from "@/app/interfaces/pokemons/pokemonLocation";
import LocationData from "./component/locationData";

const PokemonLocation = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	let res: Response;
	if (searchParams.pokemon) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${searchParams.pokemon}/encounters`
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}/encounters`);
	}

	const data: EncounterLocation[] = await res.json(); // Type the response data

	return (
		<div className={styles.pokemonLocation}>
			<h2>Pokemon Encounter Locations</h2>

			<LocationData data={data} />
		</div>
	);
};

export default PokemonLocation;
