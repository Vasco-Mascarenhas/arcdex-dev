import React from "react";
import styles from "./page.module.css";
const Page = async ({ params }: { params: { move: string } }) => {
	const res = await fetch(`https://pokeapi.co/api/v2/move/${params.move}`);

	const data = await res.json();
	return (
		<div className={styles.move}>
			<div className={styles.details}>
				<h2>{data.name}</h2>
			</div>
		</div>
	);
};

export default Page;
