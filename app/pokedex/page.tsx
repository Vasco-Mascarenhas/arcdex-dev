import React from "react";
import styles from "./page.module.css";
import PokedexContainer from "../components/pokedexContainer/pokedexContainer";
const Page = () => {
	console.log("rendered");
	return (
		<div className={styles.pokedex}>
			<PokedexContainer />
		</div>
	);
};

export default Page;
