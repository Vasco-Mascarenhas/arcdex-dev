import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./gamecard.module.css";
const GameCard = ({ name }: { name: string }) => {
	return (
		<Link className={styles.gameCardLink} href={`/pokedex`}>
			<div className={styles.gameCard}>
				<Image
					src={`/games/${name}.jpg`}
					width={80}
					height={80}
					alt={`Pokemon ${name} game`}
				/>
			</div>
		</Link>
	);
};

export default GameCard;
