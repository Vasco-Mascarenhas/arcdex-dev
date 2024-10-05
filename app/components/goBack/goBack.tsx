"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./goback.module.css";
const GoBack = ({ placeholder }: { placeholder: string }) => {
	const router = useRouter();

	return (
		<button className={styles.back} type="button" onClick={() => router.back()}>
			<span>&#8592;</span> Back to {placeholder}
		</button>
	);
};

export default GoBack;
