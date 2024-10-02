import React from "react";
import Input from "../input/input";
import Selects from "../select/select";
import { Option } from "@/app/interfaces/select/selectOpt";
import styles from "./ordering.module.css";
import CheckBox from "../checkbox/checkbox";
interface OrderingProps {
	options: Option[];
	placeholder: string; // Define the type of the placeholder prop
	rarity: string[];
}

const Ordering = ({ options, placeholder, rarity }: OrderingProps) => {
	return (
		<div className={styles.ordering}>
			<Input placeholder={placeholder} />
			<div className={styles.filter}>
				<Selects options={options} />
				<CheckBox options={rarity} />
			</div>
		</div>
	);
};

export default Ordering;
