"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./expandedButton.module.css";
const ExpandedButton = () => {
	const pathName = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleExpandToggle = () => {
		// Get the current expanded state from the search parameters
		const params = new URLSearchParams(searchParams.toString());
		const currentExpanded = params.get("expanded") === "true"; // Check if expanded is currently true

		// Toggle the expanded state
		if (currentExpanded) {
			params.delete("expanded"); // Remove the expanded parameter
		} else {
			params.set("expanded", "true"); // Set expanded to true
		}

		// Update the URL with the new parameters
		router.push(`${pathName}?${params.toString()}`);
	};

	return (
		<button onClick={handleExpandToggle} className={styles.expand}>
			{searchParams.get("expanded") === "true" ? "Less..." : "More..."}
		</button>
	);
};

export default ExpandedButton;
