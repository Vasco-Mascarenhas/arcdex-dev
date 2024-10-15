import { typeOptions } from "@/app/constants/typeOptions";
import PokemonContainer from "../pokemon-container/pokemonContainer";
import Ordering from "../ordering/ordering";
import styles from "./pokedexContainer.module.css";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import { PokemonShort } from "@/app/interfaces/pokemons/pokemonShort";

const PokedexContainer = ({
	pokemons,
	searchParams,
}: {
	pokemons: PokemonShort[];
	searchParams: SearchParams;
}) => {
	const rare = ["mythical", "legendary"];

	return (
		<section className={styles.pokemonSection}>
			<Ordering
				options={typeOptions}
				placeholder="Search Pokemon!"
				rarity={rare}
			/>
			<PokemonContainer pokemons={pokemons} searchParams={searchParams} />
		</section>
	);
};

export default PokedexContainer;
