import React from "react";
import Image from "next/image";
import styles from "./pokemonPreview.module.css";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";
import PokemonTypes from "../pokemon-types/pokemonTypes";
const PokemonPreview = ({ pokemon }: { pokemon: PokemonShort }) => {
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
				/>
			</div>
			<div className={styles.previewName}>
				<h4 className={styles.previewName}>{pokemon.name.replace("-", " ")}</h4>
			</div>
			<div className={styles.previewId}>
				<span>#{pokemon.id}</span>
			</div>
			<div className={styles.previewTypes}>
				<PokemonTypes types={pokemon.types} />
			</div>
		</div>
	);
};

export default PokemonPreview;
