"use client";

import React from "react";
import Image from "next/image";
import styles from "./pokemonPreview.module.css";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import PokemonTypes from "../pokemon-types/pokemonTypes";
const PokemonPreview = ({ pokemon }: { pokemon: PokemonShort }) => {
	const handleImgError = async (
		e: React.SyntheticEvent<HTMLImageElement>,
		id: number
	) => {
		const target = e.target as HTMLImageElement;
		const primarySrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
		const fallbackSrc = "/notfound/404.png";

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

	//console.log(pokemon);

	return (
		<div className={styles.preview}>
			<div className={styles.previewImg}>
				<Image
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
					unoptimized={true}
					className={styles.prevImg}
					alt={`${pokemon.name} image`}
					width={100}
					height={70}
					onError={(e) => handleImgError(e, pokemon.id)}
				/>
			</div>
			<div className={styles.previewName}>
				<h4 className={styles.previewName}>
					{pokemon.name.replaceAll("-", " ")}
				</h4>
			</div>
			<div className={styles.previewId}>
				<span>#{pokemon.id}</span>
			</div>

			<div className={styles.previewTypes}>
				<PokemonTypes types={pokemon.types} />
			</div>
			{pokemon.is_legendary && (
				<div className={styles.legendary}>
					<span>Legendary</span>
				</div>
			)}
			{pokemon.is_mythical && (
				<div className={styles.mythical}>
					<span>Mythical</span>
				</div>
			)}
		</div>
	);
};

export default PokemonPreview;
