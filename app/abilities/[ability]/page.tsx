import React from "react";
import abilitiesData from "@/app/data/abilities.json";
import { AbilityData } from "@/app/interfaces/abilities/ability";
import styles from "./page.module.css";
import GoBack from "@/app/components/goBack/goBack";
const Page = ({ params }: { params: { ability: string } }) => {
	console.log(params.ability);

	const abilities: AbilityData[] = abilitiesData as unknown as AbilityData[];

	const ability = abilities.find((abil) => abil.name === params.ability);

	console.log(ability);

	return (
		<div className={styles.ability}>
			<GoBack placeholder="Abilities" />
		</div>
	);
};

export default Page;
