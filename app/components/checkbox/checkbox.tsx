"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./checkbox.module.css";
interface CheckBoxProps {
	options: string[];
}

const CheckBox: React.FC<CheckBoxProps> = ({ options }) => {
	const router = useRouter();
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const handleChange = (option: string) => {
		const updatedOptions = selectedOptions.includes(option)
			? selectedOptions.filter((item) => item !== option) // Remove if unchecked
			: [...selectedOptions, option]; // Add if checked

		setSelectedOptions(updatedOptions);

		// Create URLSearchParams object and update the 'selected' parameter
		const params = new URLSearchParams(window.location.search);
		if (updatedOptions.length > 0) {
			params.set("rarity", updatedOptions.join(","));
		} else {
			params.delete("rarity");
		}

		// Update the URL without a full page reload
		router.push(`?${params.toString()}`);
	};

	return (
		<div className={styles.checkbox}>
			{options.map((option) => (
				<div key={option} className={styles.option}>
					<input
						type="checkbox"
						id={option}
						value={option}
						checked={selectedOptions.includes(option)}
						onChange={() => handleChange(option)}
					/>
					<label htmlFor={option}>{option}</label>
				</div>
			))}
		</div>
	);
};

export default CheckBox;
