import React from "react";
import styles from "./itemContainer.module.css";
import { ItemRes } from "@/app/interfaces/heldItem/itemRes";
import Item from "../item/item";
import { SearchParams } from "@/app/interfaces/searchParams/searchPara";

interface ItemContainerProps {
	items: ItemRes[];
	searchParams: SearchParams;
}

const ItemContainer = async ({ items, searchParams }: ItemContainerProps) => {
	let fetchedItems: ItemRes[] = items;

	if (searchParams.type) {
		try {
			const res = await fetch(
				`https://pokeapi.co/api/v2/item-category/${searchParams.type}`
			);

			if (res.ok) {
				const data = await res.json();

				fetchedItems = data.items as ItemRes[];
			} else {
				return <div>An error occurred</div>;
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={styles.container}>
			{fetchedItems.slice(0, 20).map((item: ItemRes) => (
				<div className={styles.item} key={item.name}>
					<Item itemRes={item} />
				</div>
			))}
		</div>
	);
};

export default ItemContainer;
