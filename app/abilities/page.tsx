"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Ordering from "../components/ordering/ordering";
import { typeOptions } from "../constants/typeOptions";
import abilitiesData from "../data/abilities.json";
import { AbilityData } from "../interfaces/abilities/ability";
import AbilityPreview from "../components/abilityPreview/abilityPreview";

const INITIAL_LOAD = 30;
const LOAD_INCREMENT = 30;

const Page = () => {
	const options = ["legendary", "mythic"];

	const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
	const handleScroll = () => {
		const scrollPosition =
			window.innerHeight + document.documentElement.scrollTop;
		const threshold = document.documentElement.offsetHeight - 100;

		if (scrollPosition >= threshold) {
			setVisibleCount((prevCount) => prevCount + LOAD_INCREMENT);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const abilities: AbilityData[] = abilitiesData as AbilityData[];
	return (
		<div className={styles.abilities}>
			<div className={styles.abilitiesOrdering}>
				<Ordering
					placeholder="Search for an ability!"
					options={typeOptions}
					rarity={options}
				/>
			</div>
			<div className={styles.abilityContainer}>
				{abilities.slice(0, visibleCount).map((ability) => (
					<AbilityPreview key={ability.name} ability={ability} />
				))}
			</div>
		</div>
	);
};

export default Page;
