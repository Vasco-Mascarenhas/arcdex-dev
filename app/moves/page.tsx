import React from "react";
import styles from "./page.module.css";
import Ordering from "../components/ordering/ordering";
import { typeOptions } from "../constants/typeOptions";
import moves from "@/app/data/moves.json";
import MovesContainer from "../components/movesContainer/movesContainer";
import { SearchParams } from "../interfaces/searchParams/searchPara";
const Page = ({ searchParams }: { searchParams: SearchParams }) => {
	const rare = ["mythical", "legendary"];

	return (
		<div className={styles.moves}>
			<Ordering
				placeholder="Search Moves!"
				options={typeOptions}
				rarity={rare}
			/>
			<MovesContainer searchParams={searchParams} moves={moves} />
		</div>
	);
};

export default Page;
