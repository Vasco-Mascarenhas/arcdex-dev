import React from "react";
import styles from "./pokemonInfo.module.css";
import { PokemonType } from "@/app/interfaces/pokemons/pokemonType";
import { getWeaknesses } from "@/app/utility/getWeaknesses";
import Image from "next/image";

interface InfoProps {
	height: number;
	weight: number;
	base_experience: number;
	types: PokemonType[];
}

const PokemonInfo: React.FC<InfoProps> = async ({
	height,
	weight,
	base_experience,
	types,
}) => {
	const weaknesses = getWeaknesses(types);

	return (
		<div className={styles.pokemonInfo}>
			<h4>POKEMON INFO</h4>
			<div className={styles.container}>
				<div className={styles.info}>
					<h5>Height</h5>
					<span>{height === null ? "???" : height / 10}m</span>
				</div>
				<div className={styles.info}>
					<h5>Weight</h5>
					<span> {weight === null ? "???" : weight / 10}kg</span>
				</div>
				<div className={styles.info}>
					<h5>Base Exp</h5>
					<span>{base_experience === null ? "???" : base_experience}</span>
				</div>
				<div className={styles.info}>
					<h5>Weaknesses</h5>

					<div className={styles.weaknesses}>
						{weaknesses.map((weakness) => (
							<Image
								src={`/types/${weakness}.png`}
								key={weakness}
								width={20}
								height={20}
								alt={weakness}
								data-tooltip-id={weakness}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PokemonInfo;
