import React from "react";
import { Abil } from "@/app/interfaces/abilities/abilities";
import styles from "./ability.module.css";
import { AbilityData } from "@/app/interfaces/abilities/ability";
const Ability = async ({ ability }: { ability: Abil }) => {
	const res = await fetch(ability.ability.url);
	const data: AbilityData = await res.json();

	const entry = data.effect_entries.find(
		(entry) => entry.language.name === "en"
	);

	//console.log(data);
	return (
		<div className={styles.ability}>
			<h3>{data.name.replace("-", " ")}</h3>
			<p>{entry?.effect}</p>
			<span>Introduced in {data.generation.name.replace("-", " ")}</span>
		</div>
	);
};

export default Ability;
