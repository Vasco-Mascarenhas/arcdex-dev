import styles from "./pokemonLocation.module.css";
import React from "react";
import { EncounterLocation } from "@/app/interfaces/pokemons/pokemonLocation";
import LocationData from "./component/locationData";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";

const PokemonLocation = async ({
	pokemonRes,
}: {
	pokemonRes: PokemonResponse;
}) => {
	let res: Response;
	if (pokemonRes.id) {
		res = await fetch(pokemonRes.location_area_encounters, {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}/encounters`, {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	}

	const data: EncounterLocation[] = await res.json(); // Type the response data

	if (!data || data.length === 0) {
		return "";
	}

	return (
		<div className={styles.pokemonLocation}>
			<h2>Locations</h2>

			<LocationData data={data} />
		</div>
	);
};

export default PokemonLocation;
