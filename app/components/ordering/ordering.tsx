import React from "react";
import Input from "../input/input";
import Selects from "../select/select";
import { Option } from "@/app/interfaces/select/selectOpt";

interface OrderingProps {
	options: Option[];
	placeholder: string; // Define the type of the placeholder prop
}

const Ordering = ({ options, placeholder }: OrderingProps) => {
	return (
		<div>
			<Input placeholder={placeholder} />
			<Selects options={options} />
		</div>
	);
};

export default Ordering;
