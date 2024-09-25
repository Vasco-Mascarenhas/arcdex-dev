import { PokemonType } from "@/app/interfaces/pokemons/pokemonType";
import styles from "./pokemonTypes.module.css";
import { getTypeColor } from "@/app/utility/getTypeColors";
import React from "react";

const PokemonTypes = ({ types }: { types: PokemonType[] }) => {
	return (
		<div className={styles.types}>
			{types.map((type: PokemonType) => (
				<span
					style={{ backgroundColor: getTypeColor(type.type.name) }}
					className={styles.type}
					key={`Preview ${type.type.name}`}
				>
					{type.type.name}
				</span>
			))}
		</div>
	);
};

export default PokemonTypes;
