import Link from "next/link";
import React from "react";
import styles from "./regionCard.module.css";
import Image from "next/image";
const RegionCard = ({ name }: { name: string }) => {
	return (
		<Link className={styles.gameCardLink} href={`/location/${name}`}>
			<div className={styles.gameCard}>
				<div className={styles.image}>
					<Image
						src={`/regions/${name}.png`}
						width={300}
						height={200}
						alt={`Pokemon ${name} region`}
					/>
				</div>
				<div className={styles.name}>
					<h3>{name}</h3>
				</div>
			</div>
		</Link>
	);
};

export default RegionCard;
