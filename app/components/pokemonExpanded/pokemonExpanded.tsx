import React from "react";
import styles from "./pokemonExpanded.module.css";
import PokemonEvolution from "../pokemonEvolution/pokemonEvolution";
import PokemonLocation from "../pokemonLocation/pokemonLocation";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
import { getId } from "@/app/utility/getid";
import PokemonAbilityData from "../pokemonAbilityData/pokemonAbilityData";
import PokemonMoves from "../pokemonMoves/pokemonMoves";
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
	return (
		<section className={styles.pokemonExpanded}>
			<PokemonAbilityData abilities={pokemonRes.abilities} />
			<PokemonEvolution evol={data.evolution_chain} />
			<PokemonLocation pokemonRes={pokemonRes} />
			<PokemonMoves moves={pokemonRes.moves} />
		</section>
	);
};

export default PokemonExpanded;
