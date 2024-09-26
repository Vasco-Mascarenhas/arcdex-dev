import React from "react";
import styles from "./pokemonStats.module.css";
import { statName } from "@/app/constants/statName";
interface PokemonStats {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

const PokemonStats = ({ stats }: { stats: PokemonStats[] }) => {
	const getNewName = (oldName: string) => {
		const stat = statName.find((stat) => stat.name === oldName);
		return stat ? stat.new : oldName;
	};

	const getStatColor = (newColor: string) => {
		const statColor = statName.find((stat) => stat.name === newColor);
		return statColor ? statColor.color : "black";
	};
	const totalBaseStat = stats.reduce((sum, stat) => sum + stat.base_stat, 0);
	return (
		<div className={styles.stats}>
			<h4>STATS</h4>
			<div className={styles.container}>
				{stats.map((stat) => (
					<div className={styles.stat} key={stat.stat.name}>
						<h5
							key={stat.stat.name}
							style={{ background: getStatColor(stat.stat.name) }}
							className={styles.statName}
						>
							{getNewName(stat.stat.name)}
						</h5>
						<p className={styles.base} key={stat.base_stat}>
							{stat.base_stat === null ? "???" : stat.base_stat}
						</p>
					</div>
				))}
				<div className={styles.stat}>
					<h5 className={`${styles.statName} ${styles.total}`}>TOT</h5>
					<p className={styles.base}>{totalBaseStat}</p>
				</div>
			</div>
		</div>
	);
};

export default PokemonStats;
