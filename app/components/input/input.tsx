"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./input.module.css";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

interface InputProps {
	placeholder?: string;
}

const Input: React.FC<InputProps> = ({ placeholder }) => {
	const [value, setValue] = useState<string>("");
	const [debouncedValue, setDebouncedValue] = useState<string>(value);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Debouncing logic: Update debouncedValue after a delay
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, 300); // 300ms debounce delay

		// Cleanup timeout if the value changes before the delay is complete
		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	// Trigger the router push only when the debouncedValue changes
	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (debouncedValue) {
			params.set("searched", debouncedValue.replaceAll(" ", "-"));
		} else {
			params.delete("searched");
		}
		router.push(`${pathname}?${params.toString()}`);
	}, [debouncedValue, router, pathname, searchParams]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};
	return (
		<input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			className={styles.input}
		/>
	);
};

export default Input;
