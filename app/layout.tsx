// app/layout.tsx
import type { Metadata } from "next";
import NavBar from "./components/navbar/navbar";
import "./globals.css";
import Container from "./components/container/container";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "./components/themeContext/themeProvider"; // Import ThemeProvider
import ThemeToggle from "./components/themeSwitcher/themeToggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
	weight: "300",
});

export const metadata: Metadata = {
	title: "ArcDex",
	description: "Pokedex",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider>
			<html lang="en" className={`${roboto.className}`}>
				<body>
					<div className="layout">
						<header className="layout-header">
							<NavBar />
						</header>
						<Container>{children}</Container>
						<ThemeToggle />
						<SpeedInsights />
					</div>
				</body>
			</html>
		</ThemeProvider>
	);
}
