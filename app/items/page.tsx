import React from "react";
import styles from "./page.module.css";
import { itemCategories } from "../constants/itemCategories";
import Selects from "../components/select/select";
import { SearchParams } from "../interfaces/searchParams/searchPara";
import ItemContainer from "../components/itemContainer/itemContainer";
const Page = ({ searchParams }: { searchParams: SearchParams }) => {
	console.log(searchParams);
	return (
		<div className={styles.items}>
			<div className={styles.itemsOrdering}>
				<Selects options={itemCategories} />
			</div>

			<div className={styles.container}>
				<ItemContainer searchParams={searchParams} />
			</div>
		</div>
	);
};

export default Page;
