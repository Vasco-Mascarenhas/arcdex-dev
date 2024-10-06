import React from "react";
import styles from "./page.module.css";
import { itemCategories } from "../constants/itemCategories";
import Selects from "../components/select/select";
import { SearchParams } from "../interfaces/searchParams/searchPara";
import items from "@/app/data/items.json";
import ItemContainer from "../components/itemContainer/itemContainer";
const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
	return (
		<div className={styles.items}>
			<div className={styles.itemsOrdering}>
				<Selects options={itemCategories} />
			</div>

			<div className={styles.container}>
				<ItemContainer items={items} searchParams={searchParams} />
			</div>
		</div>
	);
};

export default Page;
