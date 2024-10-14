import { typeOptions } from "@/app/constants/typeOptions";
import React, { Suspense } from "react";
import Ordering from "../ordering/ordering";
import PokemonContainer from "../pokemon-container/pokemonContainer";
import styles from "./pokedexContainer.module.css";
import pokemons from "../../data/pokemons.json";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
const PokedexContainer = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	const rare = ["mythical", "legendary"];

	return (
		<section className={styles.pokemonSection}>
			<Suspense fallback={<div>loading...</div>}>
				<Ordering
					options={typeOptions}
					placeholder="Search Pokemon!"
					rarity={rare}
				/>
			</Suspense>
			<PokemonContainer pokemons={pokemons} searchParams={searchParams} />
		</section>
	);
};

export default PokedexContainer;
