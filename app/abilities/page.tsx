"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Ordering from "../components/ordering/ordering";
import { typeOptions } from "../constants/typeOptions";
import abilitiesData from "../data/abilities.json";
import { AbilityData } from "../interfaces/abilities/ability";
import AbilityPreview from "../components/abilityPreview/abilityPreview";
import { SearchParams } from "../interfaces/searchParams/searchPara";

const INITIAL_LOAD = 30;
const LOAD_INCREMENT = 30;

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
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
	let filteredAbilities: AbilityData[] = abilities;

	if (searchParams.searched) {
		filteredAbilities = abilities.filter((ability) =>
			ability.name.includes(searchParams.searched)
		);
	}

	if (searchParams.type) {
		filteredAbilities = abilities.filter((ability) =>
			ability.pokemon.some((poke) =>
				poke.pokemon.types.some((type) => type.type.name === searchParams.type)
			)
		);
	}
	if (searchParams.rarity) {
		const rarities = searchParams.rarity.split(",");

		filteredAbilities = abilities.filter((ability) => {
			return ability.pokemon.some((poke) => {
				return (
					(rarities.includes("legendary") &&
						poke.pokemon.is_legendary === true) ||
					(rarities.includes("mythic") && poke.pokemon.is_mythical === true)
				);
			});
		});
	}

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
				{filteredAbilities.slice(0, visibleCount).map((ability) => (
					<AbilityPreview
						key={ability.name}
						ability={ability}
						searchParams={searchParams}
					/>
				))}
			</div>
		</div>
	);
};

export default Page;
