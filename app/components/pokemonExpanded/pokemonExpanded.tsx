import React from "react";
import styles from "./pokemonExpanded.module.css";
import PokemonEvolution from "../pokemonEvolution/pokemonEvolution";
import PokemonLocation from "../pokemonLocation/pokemonLocation";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
import { getId } from "@/app/utility/getid";
const PokemonExpanded = async ({
	pokemonRes,
}: {
	pokemonRes: PokemonResponse;
}) => {
	let res;
	if (pokemonRes.id) {
		res = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${getId(
				pokemonRes.species.url
			)}`
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${1}`);
	}
	const data = await res.json();
	console.log(pokemonRes.abilities);
	return (
		<section className={styles.pokemonExpanded}>
			<PokemonEvolution evol={data.evolution_chain} />
			<PokemonLocation pokemonRes={pokemonRes} />
		</section>
	);
};

export default PokemonExpanded;
