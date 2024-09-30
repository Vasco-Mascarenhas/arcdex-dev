import React from "react";
import styles from "./pokemonExpanded.module.css";
import PokemonEvolution from "../pokemonEvolution/pokemonEvolution";
import PokemonLocation from "../pokemonLocation/pokemonLocation";
import { PokemonResponse } from "@/app/interfaces/pokemons/pokemonResponse";
import { getId } from "@/app/utility/getid";
import PokemonAbilityData from "../pokemonAbilityData/pokemonAbilityData";
import PokemonMoves from "../pokemonMoves/pokemonMoves";
import PokemonHeld from "../pokemonHeld/pokemonHeld";
import PokemonVariety from "../pokemonVariety/pokemonVariety";
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
			)}`,
			{
				next: { revalidate: 0 }, // Cache indefinitely
			}
		);
	} else {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${1}`, {
			next: { revalidate: 0 }, // Cache indefinitely
		});
	}
	const data = await res.json();
	return (
		<section className={styles.pokemonExpanded}>
			<PokemonAbilityData abilities={pokemonRes.abilities} />
			<PokemonHeld heldItem={pokemonRes.held_items} />
			<PokemonEvolution evol={data.evolution_chain} />
			<PokemonVariety pokemonVariety={data.varieties} />
			<PokemonLocation pokemonRes={pokemonRes} />
			<PokemonMoves moves={pokemonRes.moves} />
		</section>
	);
};

export default PokemonExpanded;
