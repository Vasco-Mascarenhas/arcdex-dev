"use client";

import { Option } from "@/app/interfaces/select/selectOpt";
import Select, { SingleValue, StylesConfig } from "react-select";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./select.module.css";

const selectStyle: StylesConfig<Option, false> = {
	container: (provided) => ({
		...provided,
		width: "200px",
		height: "40px",
		backgroundColor: "var(--background)",
	}),

	menuList: (provided) => ({
		...provided,
		backgroundColor: "var(--background)",
		paddingTop: 0,
		paddingBottom: 0,
	}),
	control: (provided) => ({
		...provided,
		backgroundColor: "rgb(113 142 188 / 10%)",
		borderColor: "rgba(113, 142, 188, 0.29)",
		minHeight: "100%",
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected
			? "var(--accent)"
			: state.isFocused
			? "var(--accent)"
			: "var(--glass)",
		color: state.isSelected
			? "var(--white)"
			: state.isFocused
			? "var(--white)"
			: "var(--text)",
		padding: "10px",
		cursor: "pointer",
	}),
	singleValue: (provided) => ({
		...provided,
		color: "var(--text)",
	}),
};

const Selects = ({ options }: { options: Option[] }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const params = new URLSearchParams(searchParams.toString());
	const handleSelect = (option: SingleValue<Option>) => {
		if (option && option.value !== "") {
			params.set("type", option.value);
		} else {
			params.delete("type");
		}

		router.push(`${pathname}?${params.toString().toLowerCase()}`);
	};

	const selected = params.get("type");

	const selectedOption = options.find(
		(opt) => opt.label.toLowerCase() === selected
	);
	return (
		<Select
			id="selector"
			className={styles.select}
			instanceId={2}
			options={options}
			onChange={handleSelect}
			styles={selectStyle}
			value={selectedOption}
		/>
	);
};

export default Selects;
