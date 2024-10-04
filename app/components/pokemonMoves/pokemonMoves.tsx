"use client";
import { useState, useMemo, useEffect } from "react";
import { Move as MoveInterface } from "@/app/interfaces/move/move";
import { versionGroupOrders } from "@/app/constants/pokemonOrder";
import styles from "./pokemonMoves.module.css";
import movesData from "../../data/moves.json";
import { MoveData } from "@/app/interfaces/move/moveData";
import { getTypeColor } from "@/app/utility/getTypeColors";

// Create a lookup object for moves data
const movesLookup = movesData.reduce((lookup, move: MoveData) => {
	lookup[move.name] = {
		name: move.name,
		id: move.id,
		power: move.power,
		pp: move.pp,
		type: move.type,
		accuracy: move.accuracy,
	};
	return lookup;
}, {} as Record<string, MoveData>);

const moveLearnMethodsOrder = ["level-up", "machine", "tutor", "egg"]; // Desired order of move learning methods

const PokemonMoves = ({ moves }: { moves: MoveInterface[] }) => {
	const versionGroups = useMemo(() => {
		const uniqueGroups = new Set<string>();

		moves.forEach((move) => {
			move.version_group_details.forEach((detail) => {
				uniqueGroups.add(detail.version_group.name);
			});
		});

		const sortedGroups = Array.from(uniqueGroups).sort(
			(a, b) =>
				versionGroupOrders.findIndex((order) => order.name === a) -
				versionGroupOrders.findIndex((order) => order.name === b)
		);

		return sortedGroups;
	}, [moves]);

	const [selectedVersionGroup, setSelectedVersionGroup] = useState<string>(
		versionGroups[0]
	);

	useEffect(() => {
		if (!versionGroups.includes(selectedVersionGroup)) {
			setSelectedVersionGroup(versionGroups[0]);
		}
	}, [moves, versionGroups, selectedVersionGroup]);

	// Map the moves prop to include data from the moves JSON file
	const enrichedMoves = moves.map((move) => {
		const moveData = movesLookup[move.move.name];

		return {
			...move,
			version_group_details: move.version_group_details,
			power: moveData?.power || null,
			pp: moveData?.pp || 0,
			type: moveData?.type || "",
			accuracy: moveData?.accuracy || null,
		};
	});

	const filteredMoves = useMemo(() => {
		const moveSet = new Set();

		return enrichedMoves
			.map((move) => {
				const filteredDetails = move.version_group_details.filter(
					(method) => method.version_group.name === selectedVersionGroup
				);

				if (filteredDetails.length > 0) {
					const moveKey = `${move.move.name}-${filteredDetails[0].move_learn_method.name}`;

					if (!moveSet.has(moveKey)) {
						moveSet.add(moveKey);
						return {
							...move,
							version_group_details: filteredDetails,
						};
					}
				}
				return null;
			})
			.filter((move) => move !== null);
	}, [enrichedMoves, selectedVersionGroup]);

	const groupedMoves = useMemo(() => {
		const groups: Record<string, MoveInterface[]> = {};

		// Group moves by their learn method (level-up, machine, etc.)
		filteredMoves.forEach((move) => {
			move.version_group_details.forEach((detail) => {
				const methodName = detail.move_learn_method.name;

				// Ensure moves are grouped by method and filtered by the selected version group
				if (!groups[methodName]) {
					groups[methodName] = [];
				}

				groups[methodName].push({
					...move,
					version_group_details: [detail], // Grouping moves by method
				});
			});
		});

		// Sort groups based on the desired order
		const sortedGroups: Record<string, MoveInterface[]> = {};
		moveLearnMethodsOrder.forEach((method) => {
			if (groups[method]) {
				sortedGroups[method] = groups[method];
			}
		});

		// Sort level-up moves by level_learned_at in ascending order
		if (sortedGroups["level-up"]) {
			sortedGroups["level-up"].sort((a, b) => {
				const levelA = a.version_group_details[0]?.level_learned_at || Infinity;
				const levelB = b.version_group_details[0]?.level_learned_at || Infinity;
				return levelA - levelB; // Sort in ascending order
			});
		}

		return sortedGroups;
	}, [filteredMoves]);

	return (
		<div className={styles.container}>
			<h2>Moves</h2>
			<div className={styles.tabs}>
				{versionGroups.map((version) => (
					<button
						key={version}
						onClick={() => setSelectedVersionGroup(version)}
						className={`${
							selectedVersionGroup === version
								? styles.selected
								: styles.version
						}`}
					>
						{version.replace(/-/g, " ")}
					</button>
				))}
			</div>

			<div className={styles.moves}>
				{Object.keys(groupedMoves).length > 0 ? (
					Object.entries(groupedMoves).map(([methodName, moves]) => (
						<div
							key={methodName}
							className={`${styles.moveContainer} ${
								methodName === "tutor" ? styles.tutor : ""
							}`}
						>
							<h3>{methodName.replaceAll("-", " ")}</h3>
							<div className={styles.movContainer}>
								{moves.map((move, index) => (
									<div key={move.move.name + index} className={styles.move}>
										<span className={styles.moveName}>
											{move.move.name.replaceAll("-", " ")}
										</span>
										{move.version_group_details.map((detail, detailIndex) => (
											<div
												className={styles.method}
												key={detail.move_learn_method.name + detailIndex}
											>
												{/* Show level only if it's a "level-up" move */}
												{detail.move_learn_method.name === "level-up" && (
													<>
														<span>lvl {detail.level_learned_at}</span>
														{move.power != null && (
															<span>pow: {move.power}</span>
														)}
														<span>pp: {move.pp}</span>
														<span
															style={{
																backgroundColor: getTypeColor(move.type),
															}}
															className={styles.type}
														>
															{move.type}
														</span>
														<span>
															acc: {move.accuracy != null ? move.accuracy : "-"}
														</span>
													</>
												)}

												{/* Show move details for machine method */}
												{detail.move_learn_method.name === "machine" && (
													<>
														<span>
															pow: {move.power != null ? move.power : "-"}
														</span>
														<span>pp: {move.pp}</span>
														<span
															style={{
																backgroundColor: getTypeColor(move.type),
															}}
															className={styles.type}
														>
															{move.type}
														</span>
														<span>
															acc: {move.accuracy != null ? move.accuracy : "-"}
														</span>
													</>
												)}

												{/* Show move details for tutor method */}
												{detail.move_learn_method.name === "tutor" && (
													<>
														<span>
															pow: {move.power != null ? move.power : "-"}
														</span>
														<span>pp: {move.pp}</span>
														<span
															style={{
																backgroundColor: getTypeColor(move.type),
															}}
															className={styles.type}
														>
															{move.type}
														</span>
														<span>
															acc: {move.accuracy != null ? move.accuracy : "-"}
														</span>
													</>
												)}

												{/* Show move details for egg method */}
												{detail.move_learn_method.name === "egg" && (
													<>
														<span>
															pow: {move.power != null ? move.power : "-"}
														</span>

														<span>pp: {move.pp}</span>
														<span
															style={{
																backgroundColor: getTypeColor(move.type),
															}}
															className={styles.type}
														>
															{move.type}
														</span>
														<span>
															acc: {move.accuracy != null ? move.accuracy : "-"}
														</span>
													</>
												)}
											</div>
										))}
									</div>
								))}
							</div>
						</div>
					))
				) : (
					<p>No moves available for this version group.</p>
				)}
			</div>
		</div>
	);
};

export default PokemonMoves;
