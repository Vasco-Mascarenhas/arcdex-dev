import React from "react";
import { Abil } from "@/app/interfaces/abilities/abilities";
import styles from "./ability.module.css";
import { AbilityData } from "@/app/interfaces/abilities/ability";
import LinkImg from "../../linkImg/linkImg";
import Link from "next/link";
const Ability = async ({ ability }: { ability: Abil }) => {
	const res = await fetch(ability.ability.url);
	const data: AbilityData = await res.json();

	const entry = data.effect_entries.find(
		(entry) => entry.language.name === "en"
	);

	const flavor = data.flavor_text_entries.find(
		(flavor) => flavor.language.name === "en"
	);

	//console.log(data);
	return (
		<div className={styles.ability}>
			<Link
				className={styles.abilityName}
				href={{ pathname: `/abilities/${data.name}` }}
			>
				<h3>{data.name.replace("-", " ")}</h3> <LinkImg />
			</Link>
			{entry ? <p>{entry.effect}</p> : <p>{flavor?.flavor_text}</p>}
			<span>Introduced in {data.generation.name.replace("-", " ")}</span>
		</div>
	);
};

export default Ability;
