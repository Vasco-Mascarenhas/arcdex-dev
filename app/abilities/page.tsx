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
	const options = ["mythical", "legendary"];

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

	const abilities: AbilityData[] = abilitiesData as unknown as AbilityData[];
	let filteredAbilities: AbilityData[] = abilities;

	filteredAbilities = abilities.filter((ability) => {
		// Check if the ability matches the searched term, if provided
		if (
			searchParams.searched &&
			!ability.name.includes(searchParams.searched)
		) {
			return false;
		}

		// Check if the ability matches both the type and rarity conditions (if provided)
		return ability.pokemon.some((poke) => {
			const matchesType =
				!searchParams.type ||
				poke.pokemon.types.some((type) => type.type.name === searchParams.type);

			const matchesRarity =
				!searchParams.rarity ||
				searchParams.rarity.split(",").some((rarity) => {
					return (
						(rarity === "legendary" && poke.pokemon.is_legendary) ||
						(rarity === "mythical" && poke.pokemon.is_mythical)
					);
				});

			// Include the Pokémon if it matches both the type and rarity conditions
			return matchesType && matchesRarity;
		});
	});

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
