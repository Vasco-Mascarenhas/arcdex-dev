"use client";

import React from "react";
import styles from "./abilityPreview.module.css";
import { AbilityData } from "@/app/interfaces/abilities/ability";
import Image from "next/image";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import Link from "next/link";

interface AbilityPreviewProps {
	ability: AbilityData;
	searchParams: SearchParams;
}

const AbilityPreview = ({ ability, searchParams }: AbilityPreviewProps) => {
	const flavor = ability.flavor_text_entries.find(
		(flavor) => flavor.language.name === "en"
	);

	const effect = ability.effect_entries.find(
		(effect) => effect.language.name === "en"
	);

	/*
	const effect = ability.effect_entries.find(
		(entry) => entry.language.name === "en"
	);
	*/

	const handleImgError = async (
		e: React.SyntheticEvent<HTMLImageElement>,
		id: number
	) => {
		const target = e.target as HTMLImageElement;
		const primarySrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
		const fallbackSrc = "/navbar/abilities.png";

		try {
			const response = await fetch(primarySrc);
			if (!response.ok) {
				throw new Error("Primary image not found");
			}
			target.src = primarySrc;
		} catch {
			target.src = fallbackSrc;
		}
	};

	// Start with the original list of Pokémon
	let filteredPokemons = ability.pokemon;

	// Filter based on searchParams.type if it exists
	if (searchParams.type) {
		filteredPokemons = ability.pokemon.filter((poke) =>
			poke.pokemon.types.some((type) => type.type.name === searchParams.type)
		);
	}

	// Filter based on searchParams.rarity if it exists
	if (searchParams.rarity) {
		const rarities = searchParams.rarity.split(",");

		filteredPokemons = filteredPokemons.filter((poke) => {
			const isLegendary = poke.pokemon.is_legendary;
			const isMythical = poke.pokemon.is_mythical;
			return (
				(rarities.includes("legendary") && isLegendary) ||
				(rarities.includes("mythical") && isMythical)
			);
		});
	}

	return (
		<Link href={`/abilities/${ability.name}`} className={styles.ability}>
			<h3 className={styles.name}>{ability.name.replaceAll("-", " ")}</h3>
			<span className={styles.id}>#{ability.id}</span>
			<p className={styles.flavor}>
				{effect ? effect.effect : flavor?.flavor_text}
			</p>
			<span className={styles.generation}>
				{ability.generation.name.replaceAll("-", " ")}
			</span>
			<div className={styles.pokemons}>
				{filteredPokemons.slice(0, 3).map((poke, index) => (
					<div
						key={ability.name + poke.pokemon.name + index}
						className={styles.pokemon}
					>
						<Image
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${poke.pokemon.id}.gif`}
							width={80}
							height={50}
							alt={`${poke.pokemon.name} image`}
							unoptimized
							className={styles.pokemonImg}
							onError={(e) => handleImgError(e, poke.pokemon.id)}
						/>
						<h4 className={styles.pokemonName}>
							{poke.pokemon.name.replaceAll("-", " ")}
						</h4>
					</div>
				))}
			</div>
		</Link>
	);
};

export default AbilityPreview;
