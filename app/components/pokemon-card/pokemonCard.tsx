"use client";

import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React from "react";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonCard.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const PokemonCard = ({ pokemon }: { pokemon: PokemonShort }) => {
	const pathName = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const handleCardClick = (id: number) => {
		const pokeId = id.toString();

		const params = new URLSearchParams(searchParams);

		params.set("pokemon", pokeId);

		router.push(`${pathName}?${params.toString()}`, { scroll: false });
	};

	return (
		<div className={styles.card} onClick={() => handleCardClick(pokemon.id)}>
			<PokemonPreview pokemon={pokemon} />
		</div>
	);
};

export default PokemonCard;
