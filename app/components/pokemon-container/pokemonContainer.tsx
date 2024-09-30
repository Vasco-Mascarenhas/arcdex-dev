"use client";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React, { useEffect, useState } from "react";
import styles from "./pokemonContainer.module.css";
import PokemonCard from "../pokemon-card/pokemonCard";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";

const INITIAL_LOAD = 30;
const LOAD_INCREMENT = 30;

interface PokemonContainerProps {
	pokemons: PokemonShort[];
	searchParams: SearchParams;
}

const PokemonContainer = ({
	pokemons,
	searchParams,
}: PokemonContainerProps) => {
	const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
	let filteredPokemons: PokemonShort[] = pokemons;

	// Filter the Pokémon data based on the search query
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

	return (
		<div className={styles.pokemons}>
			{filteredPokemons.slice(0, visibleCount).map((pokemon: PokemonShort) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default PokemonContainer;
