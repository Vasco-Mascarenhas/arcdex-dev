import React from "react";
import styles from "./page.module.css";
import { SearchParams } from "../interfaces/searchParams/searchPara";
import PokedexContainer from "../components/pokedexContainer/pokedexContainer";
const Page = ({ searchParams }: { searchParams: SearchParams }) => {
	console.log("rendered");
	return (
		<div className={styles.pokedex}>
			<PokedexContainer searchParams={searchParams} />
		</div>
	);
};

export default Page;
