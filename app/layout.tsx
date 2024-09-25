import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "./components/navbar/navbar";
import "./globals.css";
import Container from "./components/container/container";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
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
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<header className="layout-header">
					<NavBar />
				</header>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
