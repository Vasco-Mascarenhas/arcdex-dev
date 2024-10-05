import React from "react";
import styles from "./page.module.css";
import PokemonDataContainer from "@/app/components/pokemonDataContainer/pokemonDataContainer";
import PokemonExpanded from "@/app/components/pokemonExpanded/pokemonExpanded";
import GoBack from "@/app/components/goBack/goBack";
const page = async ({ params }: { params: { pokemon: string } }) => {
	let res;
	console.log(params.pokemon);
	if (params.pokemon) {
		res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`);
	} else {
		res = await fetch("https://pokeapi.co/api/v2/pokemon/1");
	}

	const data = await res.json();
	//console.log(data);
	return (
		<div className={styles.pokemon}>
			<GoBack />
			<div className={styles.container}>
				<aside className={styles.pokemonData}>
					<PokemonDataContainer pokemonRes={data} />
				</aside>
				<section className={styles.pokemonSection}>
					<PokemonExpanded pokemonRes={data} />
				</section>
			</div>
		</div>
	);
};

export default page;
