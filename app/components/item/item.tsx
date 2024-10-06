import { ItemRes } from "@/app/interfaces/heldItem/itemRes";
import React from "react";
import styles from "./item.module.css";
import { getId } from "@/app/utility/getid";
import { ItemData } from "@/app/interfaces/heldItem/item";
import ItemImg from "./components/itemImg";
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
				<h3>{itemRes.name.replaceAll("-", " ")}</h3>
				<ItemImg
					name={data.name}
					url={data.sprites.default ? data.sprites.default : ""}
				/>
			</div>
			<div className={styles.image}></div>
			<div className={styles.content}>
				<p>{entry?.short_effect}</p>
				<p>Costs {data.cost}₽</p>
				{data.fling_effect && (
					<span>Fling effect: {data.fling_effect?.name.replace("-", " ")}</span>
				)}
			</div>
		</div>
	);
};

export default Item;
