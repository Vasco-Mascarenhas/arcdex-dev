import React from "react";
import styles from "./page.module.css";
import PokedexContainer from "../components/pokedexContainer/pokedexContainer";
import { SearchParams } from "../interfaces/searchParams/searchPara";
import pokemons from "@/app/data/pokemons.json";
// This is a server component because data fetching is done here
const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		<div className={styles.pokedex}>
			<PokedexContainer pokemons={pokemons} searchParams={searchParams} />
		</div>
	);
};

export default Page;
