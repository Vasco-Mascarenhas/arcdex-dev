import type { Metadata } from "next";
import NavBar from "./components/navbar/navbar";
import "./globals.css";
import Container from "./components/container/container";
import { Roboto } from "next/font/google";
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
		<html lang="en" className="dark">
			<body className={`${roboto.className}`}>
				<header className="layout-header">
					<NavBar />
				</header>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
