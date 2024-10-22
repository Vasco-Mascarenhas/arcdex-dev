import React from "react";
import styles from "./page.module.css";
const Page = async ({ params }: { params: { location: string } }) => {
	const res = await fetch(
		`https://pokeapi.co/api/v2/region/${params.location}`
	);
	const data = await res.json();
	return (
		<div className={styles.region}>
			<div className={styles.regionHeader}>
				<h1>{params.location}</h1>
				<span>
					Introduced in {data.main_generation.name.replaceAll("-", " ")}
				</span>
			</div>
		</div>
	);
};

export default Page;
