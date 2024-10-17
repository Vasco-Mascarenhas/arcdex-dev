import { MoveData } from "@/app/interfaces/move/moveData";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import React from "react";
import styles from "./movesContainer.module.css";
import { getTypeColor } from "@/app/utility/getTypeColors";
interface MovesContainerProps {
	moves: MoveData[];
	searchParams: SearchParams;
}

const MovesContainer = ({ moves, searchParams }: MovesContainerProps) => {
	console.log(searchParams);
	console.log(moves[0]);

	let filteredMoves = moves;

	if (searchParams.type) {
		filteredMoves = moves.filter((move) => move.type === searchParams.type);
	}

	return (
		<div className={styles.movesContainer}>
			{filteredMoves.map((move) => (
				<div key={move.id} className={styles.move}>
					<div className={styles.moveName}>
						{move.name.replaceAll("-", " ")}
					</div>
					<div className={styles.stats}>
						<span>Power: {move.power ? move.power : "-"}</span>
						<span>PP: {move.pp ? move.pp : "-"}</span>
						<span
							className={styles.type}
							style={{ backgroundColor: getTypeColor(move.type) }}
						>
							{move.type}
						</span>
						<span>Accuracy: {move.accuracy ? move.accuracy : "-"}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default MovesContainer;
