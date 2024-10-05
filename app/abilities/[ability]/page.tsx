import React from "react";
import abilitiesData from "@/app/data/abilities.json";
import { AbilityData } from "@/app/interfaces/abilities/ability";
import styles from "./page.module.css";
import GoBack from "@/app/components/goBack/goBack";
import PokemonCard from "@/app/components/pokemon-card/pokemonCard";
const Page = ({ params }: { params: { ability: string } }) => {
	console.log(params.ability);

	const abilities: AbilityData[] = abilitiesData as unknown as AbilityData[];

	const ability = abilities.find((abil) => abil.name === params.ability);
	const flavor = ability?.flavor_text_entries.find(
		(entry) => entry.language.name === "en"
	);
	const effect = ability?.effect_entries.find(
		(entry) => entry.language.name === "en"
	);

	return (
		<div className={styles.ability}>
			<GoBack />

			<div className={styles.container}>
				<div className={styles.name}>
					<h2>{ability!.name.replaceAll("-", " ")}</h2>
					<div className={styles.meta}>
						<span>#{ability!.id}</span>
						<span>{ability?.generation.name.replaceAll("-", " ")}</span>
					</div>
				</div>
				<div className={styles.description}>
					<h3>Flavor Text</h3>
					<p>{flavor?.flavor_text}</p>
				</div>
				<div className={styles.description}>
					<h3>Ability Effect</h3>
					<p>{effect?.effect}</p>
				</div>
			</div>
			<div className={styles.pokemon}>
				<h3>Pokemon with {ability!.name.replaceAll("-", " ")}</h3>
				<div className={styles.pokemons}>
					{ability!.pokemon.map((pokemon) => (
						<PokemonCard key={pokemon.pokemon.name} pokemon={pokemon.pokemon} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Page;
