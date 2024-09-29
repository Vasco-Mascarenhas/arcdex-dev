"use client";
import { useState, useMemo } from "react";
import { Move } from "@/app/interfaces/move/move";
import styles from "./pokemonMoves.module.css";

const PokemonMoves = ({ moves }: { moves: Move[] }) => {
	// Extract unique version groups from moves
	const versionGroups = useMemo(() => {
		const uniqueGroups = new Set<string>();

		moves.forEach((move) => {
			move.version_group_details.forEach((detail) => {
				uniqueGroups.add(detail.version_group.name);
			});
		});

		return Array.from(uniqueGroups);
	}, [moves]);

	// State to manage selected version group
	const [selectedVersionGroup, setSelectedVersionGroup] = useState<string>(
		versionGroups[0] // Set the first version group as default
	);

	// Filter the moves based on the selected version group
	const filteredMoves = moves.map((move) => ({
		...move,
		version_group_details: move.version_group_details.filter(
			(method) => method.version_group.name === selectedVersionGroup
		),
	}));

	return (
		<div className={styles.container}>
			<h2>Moves</h2>
			<div className={styles.tabs}>
				{versionGroups.map((version) => (
					<button
						key={version}
						onClick={() => setSelectedVersionGroup(version)}
						className={`${
							selectedVersionGroup == version ? styles.selected : styles.version
						}`}
					>
						{version.replace(/-/g, " ")}
					</button>
				))}
			</div>

			<div className={styles.moves}>
				{filteredMoves.length > 0 ? (
					filteredMoves.map((move, index) =>
						move.version_group_details.length > 0 ? (
							<div key={move.move.name + index} className={styles.move}>
								<span className={styles.moveName}>
									{move.move.name.replace("-", " ")}
								</span>
								{move.version_group_details.map((method) => (
									<div
										className={styles.method}
										key={
											method.move_learn_method.name + method.level_learned_at
										}
									>
										<span>Level: {method.level_learned_at}</span>
										<span>
											Method: {method.move_learn_method.name.replace("-", " ")}
										</span>
									</div>
								))}
							</div>
						) : null
					)
				) : (
					<p>No moves available for this version group.</p>
				)}
			</div>
		</div>
	);
};

export default PokemonMoves;
