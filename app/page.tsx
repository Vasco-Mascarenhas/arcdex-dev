"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
	const fetchItem = async () => {
		const response = await fetch(`/api/pokemons`);
		const data = await response.json();
		return data;
	};

	// Example usage in a component
	useEffect(() => {
		fetchItem().then((data) => {
			console.log(data); // Master Ball data from index.json
		});
	}, []);

	return <div className={styles.page}>nothing to see here</div>;
}
