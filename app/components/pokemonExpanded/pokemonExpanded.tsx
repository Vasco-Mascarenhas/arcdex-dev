import React from "react";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import styles from "./pokemonExpanded.module.css";
const PokemonExpanded = ({ searchParams }: { searchParams: SearchParams }) => {
	console.log(searchParams);

	return <section className={styles.pokemonExpanded}>hello</section>;
};

export default PokemonExpanded;
