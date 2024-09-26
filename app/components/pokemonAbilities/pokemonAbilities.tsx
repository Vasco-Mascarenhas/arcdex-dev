import React from "react";
import { Abil } from "@/app/interfaces/abilities/abilities";
import styles from "./pokemonAbilities.module.css";
const PokemonAbilities = async ({ abilities }: { abilities: Abil[] }) => {
	return (
		<div className={styles.abilities}>
			<h4>ABILITIES</h4>
			<div className={styles.container}>
				{abilities.map((ability) => (
					<span className={styles.ability} key={ability.ability.name}>
						{ability.ability.name}
					</span>
				))}
			</div>
		</div>
	);
};

export default PokemonAbilities;
