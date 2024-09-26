"use client";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React, { useEffect, useState } from "react";
import styles from "./pokemonContainer.module.css";
import PokemonCard from "../pokemon-card/pokemonCard";
import { useSearchParams } from "next/navigation";

const INITIAL_LOAD = 30;
const LOAD_INCREMENT = 30;

const PokemonContainer = ({ pokemons }: { pokemons: PokemonShort[] }) => {
	const searchParams = useSearchParams();
	const searchedPokemon = searchParams.get("searched")?.toLowerCase() || "";
	const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
	const selectedType = searchParams.get("type")?.toLowerCase() || "";
	let filteredPokemons: PokemonShort[] = pokemons;

	// Filter the Pokémon data based on the search query
	if (searchedPokemon) {
		filteredPokemons = pokemons?.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchedPokemon)
		);
	}

	if (selectedType) {
		filteredPokemons = filteredPokemons.filter((pokemon) =>
			pokemon.types.some((type) => type.type.name === selectedType)
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
