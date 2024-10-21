import GameCard from "./components/gameCard/gameCard";
import Input from "./components/input/input";
import styles from "./page.module.css";
import games from "@/app/data/games.json";
import regions from "@/app/data/regions.json";
import { getId } from "./utility/getid";
import RegionCard from "./components/regionCard/regionCard";
export default function Home() {
	return (
		<div className={styles.page}>
			<div className={styles.title}>
				<h1>ArcDex Pokédex</h1>
			</div>
			<div className={styles.search}>
				<Input placeholder="Search for Pokémon!" />
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
