import React from "react";
import styles from "./page.module.css";
import { ItemData } from "@/app/interfaces/items/itemInfo";
import GoBack from "@/app/components/goBack/goBack";
import ItemImg from "@/app/components/item/components/itemImg";
const Page = async ({ params }: { params: { item: string } }) => {
	console.log(params.item);
	let itemInfo;
	if (params.item) {
		try {
			const res = await fetch(`https://pokeapi.co/api/v2/item/${params.item}`);

			if (res.ok) {
				const data: ItemData = await res.json();
				itemInfo = data;
			} else {
				return <div>An error occurred</div>;
			}
		} catch (error) {
			console.log(error);
		}
	}

	const effect = itemInfo?.effect_entries.find(
		(effect) => effect.language.name === "en"
	);

	return (
		<div className={styles.item}>
			<GoBack />

			<div className={styles.container}>
				<div className={styles.name}>
					<h2>{params.item.replaceAll("-", " ")}</h2>
					<span className={styles.id}>#{itemInfo?.id}</span>
					<ItemImg
						name={params.item}
						url={itemInfo?.sprites.default ? itemInfo?.sprites.default : ""}
					/>
				</div>
				<div className={styles.versions}>
					{itemInfo?.game_indices.map((game) => (
						<span key={game.generation.name}>{game.generation.name}</span>
					))}
				</div>
				<div className={styles.effect}>
					<p>{effect?.effect}</p>
				</div>
				<div className={styles.flavor}></div>
			</div>
		</div>
	);
};

export default Page;
