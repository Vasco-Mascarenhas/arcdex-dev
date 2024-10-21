import React from "react";
import styles from "./pokemonVersion.module.css";
import GameCard from "../gameCard/gameCard";

interface PokemonVersion {
	game_index: number;
	version: {
		name: string;
		url: string;
	};
}

const PokemonVersion = async ({ versions }: { versions: PokemonVersion[] }) => {
	if (versions.length === 0) return;
	return (
		<div className={styles.versions}>
			<h2>Games ({versions.length})</h2>
			<div className={styles.container}>
				{versions.map((version) => (
					<GameCard name={version.version.name} key={version.version.name} />
				))}
			</div>
		</div>
	);
};

export default PokemonVersion;
