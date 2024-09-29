import React from "react";
import { Abil } from "@/app/interfaces/abilities/abilities";
import Ability from "./components/ability";
import styles from "./pokemonAbilityData.module.css";
const PokemonAbilityData = ({ abilities }: { abilities: Abil[] }) => {
	return (
		<div className={styles.pokemonAbility}>
			<h2>ABILITIES</h2>
			<div className={styles.container}>
				{abilities.map((ability) => (
					<Ability key={ability.ability.name} ability={ability} />
				))}
			</div>
		</div>
	);
};

export default PokemonAbilityData;
