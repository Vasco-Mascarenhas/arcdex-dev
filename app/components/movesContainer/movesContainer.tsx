import { MoveData } from "@/app/interfaces/move/moveData";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import React from "react";
import styles from "./movesContainer.module.css";
import { getTypeColor } from "@/app/utility/getTypeColors";
import Link from "next/link";
interface MovesContainerProps {
	moves: MoveData[];
	searchParams: SearchParams;
}

const MovesContainer = ({ moves, searchParams }: MovesContainerProps) => {
	let filteredMoves = moves;

	if (searchParams.searched) {
		filteredMoves = filteredMoves.filter((move) =>
			move.name.toLowerCase().includes(searchParams.searched)
		);
	}

	if (searchParams.type) {
		filteredMoves = filteredMoves.filter(
			(move) => move.type === searchParams.type
		);
	}

	return (
		<div className={styles.movesContainer}>
			{filteredMoves.map((move) => (
				<Link
					href={`/moves/${move.name}`}
					key={move.id}
					className={styles.move}
				>
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
				</Link>
			))}
		</div>
	);
};

export default MovesContainer;
