import React from "react";
import styles from "./pokemonHeld.module.css";
import { HeldItem } from "@/app/interfaces/heldItem/heldItem";
import Item from "../item/item";
const PokemonHeld = async ({ heldItem }: { heldItem: HeldItem[] }) => {
	const items = heldItem.map((item) => item);

	return (
		<div className={styles.held}>
			<h2>Held Item</h2>
			<div className={styles.items}>
				{items.length > 0 ? (
					items.map((item) => <Item itemRes={item.item} />)
				) : (
					<div>This pokemon holds no item.</div>
				)}
			</div>
		</div>
	);
};

export default PokemonHeld;
