import { Option } from "@/app/interfaces/select/selectOpt";
import Select, { SingleValue, StylesConfig } from "react-select";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./select.module.css";

const selectStyle: StylesConfig<Option, false> = {
	container: (provided) => ({
		...provided,
		width: "100%",
		marginBottom: "10px",
	}),
	control: (provided) => ({
		...provided,
		backgroundColor: "var(--secondary)",
		borderColor: "var(--accent)",
		minHeight: "40px",
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected
			? "var(--primary)"
			: state.isFocused
			? "var(--primary)"
			: "var(--secondary)",
		color: state.isSelected ? "var(--text)" : "var(--text)",
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

	return (
		<Select
			id="selector"
			className={styles.select}
			instanceId={2}
			options={options}
			onChange={handleSelect}
			styles={selectStyle}
		/>
	);
};

export default Selects;
