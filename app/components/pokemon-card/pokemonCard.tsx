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

	return (
		<div className={styles.card} onClick={() => handleCardClick(pokemon.id)}>
			<PokemonPreview pokemon={pokemon} />
			{evolutionDetails && (
				<div className={styles.evolutionDetails}>
					{evolutionDetails.slice(-1).map((detail) => (
						<div className={styles.details} key={pokemon.id}>
							{detail.item?.name ? (
								<div className={`${styles.detail} ${styles.item}`}>
									<Image
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.item.name}.png`}
										width={30}
										height={30}
										alt={detail.item.name}
									/>
								</div>
							) : (
								""
							)}

							{detail.min_level ? (
								<div className={`${styles.detail} ${styles.level}`}>
									<span>Level: {detail.min_level}</span>
								</div>
							) : (
								""
							)}
							{detail.known_move_type ? (
								<div className={`${styles.detail} ${styles.moveType}`}>
									<span>Move type: {detail.known_move_type.name}</span>
								</div>
							) : (
								""
							)}
							{detail.min_happiness ? (
								<div className={`${styles.detail} ${styles.happiness}`}>
									<span>Min Happ: {detail.min_happiness}</span>
								</div>
							) : (
								""
							)}
							{detail.held_item ? (
								<div className={`${styles.detail} ${styles.held}`}>
									<span>Held Item:</span>
									<Image
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.held_item.name}.png`}
										width={30}
										height={30}
										alt={detail.held_item.name}
									/>
								</div>
							) : (
								""
							)}
							{detail.trigger.name ? (
								<div className={`${styles.detail} ${styles.trigger}`}>
									<span>{detail.trigger.name.replace("-", " ")}</span>
								</div>
							) : (
								""
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PokemonCard;
