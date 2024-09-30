import { ItemRes } from "@/app/interfaces/heldItem/itemRes";
import React from "react";
import Image from "next/image";
import styles from "./item.module.css";
import { getId } from "@/app/utility/getid";
import { ItemData } from "@/app/interfaces/heldItem/item";
const Item = async ({ itemRes }: { itemRes: ItemRes }) => {
	const res = await fetch(
		`https://pokeapi.co/api/v2/item/${getId(itemRes.url)}/`
	);
	const data: ItemData = await res.json();
	const entry = data.effect_entries.find(
		(entry) => entry.language.name === "en"
	);

	/*
	const flavor = data.flavor_text_entries.find(
		(flavor) => flavor.language.name === "en"
	);
	*/

	return (
		<div className={styles.item}>
			<div className={styles.title}>
				<h3>{itemRes.name.replace("-", " ")}</h3>
				<Image
					key={itemRes.name}
					src={data.sprites.default}
					width={30}
					height={30}
					alt={itemRes.name}
				/>
			</div>
			<div className={styles.image}></div>
			<div className={styles.content}>
				<p>{entry?.effect}</p>
				<p>Costs {data.cost}₽</p>
				<span>Fling effect: {data.fling_effect?.name.replace("-", " ")}</span>
			</div>
		</div>
	);
};

export default Item;
