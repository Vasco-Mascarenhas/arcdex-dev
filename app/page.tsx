import GameCard from "./components/gameCard/gameCard";
import Input from "./components/input/input";
import styles from "./page.module.css";
import games from "@/app/data/games.json";
import regions from "@/app/data/regions.json";
import { getId } from "./utility/getid";
import RegionCard from "./components/regionCard/regionCard";
import { Suspense } from "react";
import pokemons from "@/app/data/pokemons.json";
import PokemonContainer from "./components/pokemon-container/pokemonContainer";
import { SearchParams } from "./interfaces/searchParams/searchPara";
export default function Home({ searchParams }: { searchParams: SearchParams }) {
	return (
		<div className={styles.page}>
			<div className={styles.title}>
				<h1>ArcDex Pokédex</h1>
			</div>
			<div className={styles.search}>
				<Suspense>
					<Input placeholder="Search for Pokémon!" />
				</Suspense>
				<PokemonContainer
					pokemons={pokemons.slice(0, 3)}
					searchParams={searchParams}
				/>
			</div>
			<div className={styles.games}>
				<h2>Games</h2>
				<div className={styles.gameContainer}>
					{games.map((game) => (
						<GameCard key={getId(game.url)} name={game.name} />
					))}
				</div>
			</div>
			<div className={styles.regions}>
				<h2>Regions</h2>
				<div className={styles.regionsContainer}>
					{regions.map((region) => (
						<RegionCard name={region.name} key={region.name} />
					))}
				</div>
			</div>
		</div>
	);
}
