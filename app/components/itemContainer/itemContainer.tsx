import { SearchParams } from "@/app/interfaces/searchParams/searchPara";
import items from "@/app/data/items.json";
import React from "react";
import styles from "./itemContainer.module.css";
import Item from "../item/item";
const ItemContainer = ({ searchParams }: { searchParams: SearchParams }) => {
	console.log(searchParams);
	return (
		<div className={styles.container}>
			{items.slice(0, 20).map((item) => (
				<div className={styles.item} key={item.name}>
					<Item itemRes={item} />
				</div>
			))}
		</div>
	);
};

export default ItemContainer;
