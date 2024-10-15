"use client";

import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import styles from "./pokemonContainer.module.css";
import React, { useEffect, useState } from "react";
import PokemonCard from "../pokemon-card/pokemonCard";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";

interface PokemonContainerProps {
	searchParams: SearchParams;
	pokemons: PokemonShort[];
}

const INITIAL_LOAD = 30;
const LOAD_INCREMENT = 30;

const PokemonContainer = ({
	searchParams,
	pokemons,
}: PokemonContainerProps) => {
	const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
	let filteredPokemons: PokemonShort[] = pokemons;
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

	if (searchParams.searched) {
		filteredPokemons = pokemons?.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchParams.searched)
		);
	}
	if (searchParams.type) {
		filteredPokemons = filteredPokemons.filter((pokemon) =>
			pokemon.types.some((type) => type.type.name === searchParams.type)
		);
	}

	if (searchParams.rarity) {
		const rarities = searchParams.rarity.split(",");
		filteredPokemons = filteredPokemons.filter((pokemon) => {
			return (
				(rarities.includes("legendary") && pokemon.is_legendary) ||
				(rarities.includes("mythical") && pokemon.is_mythical)
			);
		});
	}
	return (
		<div className={styles.pokemons}>
			{filteredPokemons.slice(0, visibleCount).map((pokemon: PokemonShort) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default PokemonContainer;
