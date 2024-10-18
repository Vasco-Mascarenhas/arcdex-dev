import React from "react";
import styles from "./page.module.css";
import GoBack from "@/app/components/goBack/goBack";
import { getTypeColor } from "@/app/utility/getTypeColors";
import { Moves } from "@/app/interfaces/move/moves";
import Image from "next/image";
import pokemons from "@/app/data/pokemons.json";
import { getId } from "@/app/utility/getid";
import PokemonCard from "@/app/components/pokemon-card/pokemonCard";
import PokemonContainer from "@/app/components/pokemon-container/pokemonContainer";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";

interface MovePageProps {
	searchParams: SearchParams;
	params: { move: string };
}

const Page = async ({ params, searchParams }: MovePageProps) => {
	const res = await fetch(`https://pokeapi.co/api/v2/move/${params.move}`);

	const data: Moves = await res.json();

	const groupedFlavors = data.flavor_text_entries
		.filter((entry) => entry.language.name === "en")
		.reduce((acc, entry) => {
			const flavorText = entry.flavor_text;
			const versionGroup = entry.version_group.name;

			// Check if this flavor text is already in the accumulator
			if (!acc[flavorText]) {
				acc[flavorText] = [];
			}

			// Add the version group to the list for this flavor text
			acc[flavorText].push(versionGroup);

			return acc;
		}, {} as Record<string, string[]>); // Using a Record to group version groups by flavor text

	const effects = data.effect_entries.filter(
		(effect) => effect.language.name === "en"
	);

	const effectChanges = data.effect_changes.map((effect) =>
		effect.effect_entries.filter((effct) => effct.language.name === "en")
	);

	let movePokemons = [];

	for (let i = 0; i < data.learned_by_pokemon.length; i++) {
		movePokemons.push(pokemons[Number(getId(data.learned_by_pokemon[i].url))]);
	}

	return (
		<div className={styles.move}>
			<GoBack />
			<div className={styles.header}>
				<h1>{data.name.replaceAll("-", " ")}</h1>
				<span
					className={styles.type}
					style={{ backgroundColor: getTypeColor(data.type.name) }}
				>
					{data.type.name}
				</span>
				<span className={styles.generation}>
					{data.generation.name.replaceAll("-", " ")}
				</span>
				<span>#{data.id}</span>
			</div>
			<div className={styles.details}>
				<div className={styles.stats}>
					<div className={styles.stat}>
						<Image
							src={"/move/power.png"}
							width={25}
							height={25}
							alt="Power icon"
						/>

						<div className={styles.statInfo}>
							<span className={styles.statName}>Power</span>
							<h4 className={styles.statValue}>{data.power}</h4>
						</div>
					</div>
					<div className={styles.stat}>
						<Image
							src={"/move/accuracy.png"}
							width={30}
							height={30}
							alt="Power icon"
						/>

						<div className={styles.statInfo}>
							<span className={styles.statName}>Accuracy</span>
							<h4 className={styles.statValue}>{data.accuracy}</h4>
						</div>
					</div>
					<div className={styles.stat}>
						<Image
							src={"/move/category.png"}
							width={30}
							height={30}
							alt="Category icon"
						/>

						<div className={styles.statInfo}>
							<span className={styles.statName}>Category</span>
							<h4 className={styles.statValue}>{data.damage_class.name}</h4>
						</div>
					</div>
					<div className={styles.stat}>
						<Image src={"/move/pp.png"} width={30} height={30} alt="PP icon" />
						<div className={styles.statInfo}>
							<span className={styles.statName}>PP</span>
							<h4 className={styles.statValue}>{data.pp}</h4>
						</div>
					</div>
					<div className={styles.stat}>
						<Image
							src={"/move/priority.png"}
							width={30}
							height={30}
							alt="Priority icon"
						/>

						<div className={styles.statInfo}>
							<span className={styles.statName}>Priority</span>
							<h4 className={styles.statValue}>{data.priority}</h4>
						</div>
					</div>
					<div className={styles.stat}>
						<Image
							src={"/move/target.png"}
							width={35}
							height={35}
							alt="Target icon"
						/>

						<div className={styles.statInfo}>
							<span className={styles.statName}>Target</span>
							<h4 className={styles.statValue}>
								{data.target.name.replaceAll("-", " ")}
							</h4>
						</div>
					</div>
				</div>
				<h2 className={styles.description}>Effect</h2>
				<div className={styles.effect}>
					{effects.map((effect) => (
						<p key={effect.effect}>{effect.short_effect}</p>
					))}
				</div>
				<h2 className={styles.description}>Description</h2>
				<div className={styles.versions}>
					{Object.entries(groupedFlavors).map(([flavorText, versionGroups]) => (
						<div key={flavorText} className={styles.flavor}>
							<Image
								src={"/controller/controller.png"}
								width={20}
								height={20}
								alt="Game version icon"
							/>
							<h4>{versionGroups.join(" / ").replaceAll("-", " ")}</h4>
							<p>{flavorText}</p>
						</div>
					))}
				</div>
				<br />
				<h2 className={styles.description}>
					Learned By {movePokemons.length} pokemon
				</h2>

				<PokemonContainer pokemons={movePokemons} searchParams={searchParams} />
			</div>
		</div>
	);
};

export default Page;
