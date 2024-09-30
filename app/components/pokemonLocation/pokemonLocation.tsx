import styles from "./pokemonLocation.module.css";
import React from "react";
import { EncounterLocation } from "@/app/interfaces/pokemons/pokemonLocation";
import LocationData from "./component/locationData";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
import { getId } from "@/app/utility/getid";

const PokemonLocation = async ({
	pokemonRes,
}: {
	pokemonRes: PokemonResponse;
}) => {
	let res: Response;
	if (pokemonRes.id) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${getId(
				pokemonRes.species.url
			)}/encounters`,
			{
				next: { revalidate: 0 }, // Cache indefinitely
			}
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${1}/encounters`, {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	}

	const data: EncounterLocation[] = await res.json(); // Type the response data

	return (
		<div className={styles.pokemonLocation}>
			<h2>Locations</h2>

			<LocationData data={data} />
		</div>
	);
};

export default PokemonLocation;
