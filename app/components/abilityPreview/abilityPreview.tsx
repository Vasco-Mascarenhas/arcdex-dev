"use client";

import React from "react";
import styles from "./abilityPreview.module.css";
import { AbilityData } from "@/app/interfaces/abilities/ability";
import Image from "next/image";
import { getId } from "@/app/utility/getid";

const AbilityPreview = ({ ability }: { ability: AbilityData }) => {
	const flavor = ability.flavor_text_entries.find(
		(flavor) => flavor.language.name === "en"
	);
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

	return (
		<div className={styles.ability}>
			<h3 className={styles.name}>{ability.name.replaceAll("-", " ")}</h3>
			<span className={styles.id}>#{ability.id}</span>
			<p className={styles.flavor}>{flavor?.flavor_text}</p>
			<span className={styles.generation}>
				{ability.generation.name.replaceAll("-", " ")}
			</span>
			<div className={styles.pokemons}>
				{ability.pokemon.slice(0, 3).map((poke) => (
					<div key={poke.pokemon.name} className={styles.pokemon}>
						<Image
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${getId(
								poke.pokemon.url
							)}.gif`}
							width={100}
							height={70}
							alt={`${poke.pokemon.name} image`}
							unoptimized
							className={styles.pokemonImg}
							onError={(e) =>
								handleImgError(e, Number(getId(poke.pokemon.url)))
							}
						/>
						<h4 className={styles.pokemonName}>
							{poke.pokemon.name.replaceAll("-", " ")}
						</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default AbilityPreview;
