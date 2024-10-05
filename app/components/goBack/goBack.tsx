"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./goback.module.css";
const GoBack = () => {
	const router = useRouter();

	return (
		<button className={styles.back} type="button" onClick={() => router.back()}>
			<span>&#8592;</span> Go back
		</button>
	);
};

export default GoBack;
