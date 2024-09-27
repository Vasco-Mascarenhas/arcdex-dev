import React from "react";
import styles from "./pokemonEvolution.module.css";
import { PokemonEvol } from "@/app/interfaces/pokemons/pokemonEvolution";
import { getPokemon } from "@/app/utility/getid";
import PokemonCard from "../pokemon-card/pokemonCard";
interface Evolution {
	evol: {
		url: string;
	};
}

const PokemonEvolution = async ({ evol }: Evolution) => {
	const res = await fetch(evol.url);
	const data: PokemonEvol = await res.json();
	//console.log(getPokemon(data.chain.species.url));
	const firstEvol = getPokemon(data?.chain?.species?.url);
	const secondEvol = getPokemon(data?.chain?.evolves_to[0]?.species?.url);
	const thirdEvol = getPokemon(
		data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.url
	);

	return (
		<div className={styles.pokemonEvolution}>
			<h4>EVOLUTION DETAILS</h4>

			<div className={styles.evolutions}>
				<div className={styles.evolution}>
					{firstEvol ? <PokemonCard pokemon={firstEvol} /> : ""}
				</div>
				<div className={styles.evolution}>
					{secondEvol ? <PokemonCard pokemon={secondEvol} /> : ""}
				</div>
				<div className={styles.evolution}>
					{thirdEvol ? <PokemonCard pokemon={thirdEvol} /> : ""}
				</div>
			</div>
		</div>
	);
};

export default PokemonEvolution;
