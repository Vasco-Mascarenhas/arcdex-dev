import React from "react";
import Input from "../input/input";
import Selects from "../select/select";
import { Option } from "@/app/interfaces/select/selectOpt";
import styles from "./ordering.module.css";
interface OrderingProps {
	options: Option[];
	placeholder: string; // Define the type of the placeholder prop
}

const Ordering = ({ options, placeholder }: OrderingProps) => {
	return (
		<div className={styles.ordering}>
			<Input placeholder={placeholder} />
			<Selects options={options} />
		</div>
	);
};

export default Ordering;
