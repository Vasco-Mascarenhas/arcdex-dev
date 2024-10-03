import React from "react";
import styles from "./pokemonVersion.module.css";

interface PokemonVersion {
	game_index: number;
	version: {
		name: string;
		url: string;
	};
}

const PokemonVersion = async ({ versions }: { versions: PokemonVersion[] }) => {
	console.log(versions);

	if (versions.length === 0) return;
	return (
		<div className={styles.versions}>
			<h2>Games</h2>
			<div className={styles.container}>
				{versions.map((version) => (
					<span key={version.version.name}>
						{version.version.name.replaceAll("-", " ")}
					</span>
				))}
			</div>
		</div>
	);
};

export default PokemonVersion;
