"use client";

import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import React from "react";
import PokemonPreview from "../pokemon-preview/pokemonPreview";
import styles from "./pokemonCard.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EvolutionDetail } from "@/app/interfaces/pokemons/pokemonEvolution";
import Image from "next/image";

interface PokemonCardProps {
	pokemon: PokemonShort;
	evolutionDetails?: EvolutionDetail[]; // Optional prop for evolution details
}

const PokemonCard = ({ pokemon, evolutionDetails }: PokemonCardProps) => {
	const pathName = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleCardClick = (id: number) => {
		const pokeId = id.toString();
		const params = new URLSearchParams(searchParams);
		params.set("pokemon", pokeId);
		router.push(`${pathName}?${params.toString()}`, { scroll: false });
	};

	console.log(evolutionDetails);
	return (
		<div className={styles.card} onClick={() => handleCardClick(pokemon.id)}>
			<PokemonPreview pokemon={pokemon} />
			{evolutionDetails && (
				<div className={styles.evolutionDetails}>
					{evolutionDetails.slice(-1).map((detail) => (
						<div className={styles.details} key={pokemon.id}>
							{detail.item?.name}
							{detail.item?.name ? (
								<Image
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.item.name}.png`}
									width={30}
									height={30}
									alt={detail.item.name}
								/>
							) : (
								""
							)}
							{detail.known_move_type?.name}
							{detail.min_happiness}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PokemonCard;
