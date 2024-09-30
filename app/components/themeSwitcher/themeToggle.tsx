"use client";
import { useTheme } from "../themeContext/themeProvider";
import styles from "./themetoggle.module.css";
import Image from "next/image";
import sun from "../../../public/theme/sun.png";
import moon from "../../../public/theme/moon.png";
const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button onClick={toggleTheme} className={styles.toggle}>
			{theme === "light" ? (
				<Image src={sun} width={40} height={40} alt="theme toggle dark" />
			) : (
				<Image src={moon} width={40} height={40} alt="theme toggle light" />
			)}
		</button>
	);
};

export default ThemeToggle;
