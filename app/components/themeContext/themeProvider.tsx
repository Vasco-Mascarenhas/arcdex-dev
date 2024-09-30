"use client";

// context/ThemeContext.tsx
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	useEffect(() => {
		const savedTheme =
			(localStorage.getItem("theme") as "light" | "dark") || "light";
		setTheme(savedTheme);
		document.body.className = savedTheme; // Set initial theme on body
	}, []);

	useEffect(() => {
		document.body.className = theme;
		localStorage.setItem("theme", theme); // Save theme to local storage
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
