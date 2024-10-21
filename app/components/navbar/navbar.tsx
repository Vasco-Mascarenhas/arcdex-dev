"use client";

import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
interface Route {
	name: string;
	link: string;
}

const routes: Route[] = [
	{
		name: "home",
		link: "/",
	},
	{
		name: "national-dex",
		link: "/pokedex",
	},
	{
		name: "abilities",
		link: "/abilities",
	},
	{
		name: "moves",
		link: "/moves",
	},
	{
		name: "items",
		link: "/items",
	},
];

/*


*/

const NavBar = () => {
	const pathName = usePathname();
	return (
		<nav className={styles.navbar}>
			{routes.map((route) => (
				<Link
					href={route.link}
					key={route.name}
					prefetch={true}
					className={`${styles.link} ${
						// Special handling for home route
						route.link === "/"
							? pathName === "/" && styles.active
							: pathName.startsWith(route.link)
							? styles.active
							: ""
					}`}
				>
					<Image
						className={styles.logo}
						src={`/navbar/${route.name}.png`}
						alt={route.name + " link"}
						width={50}
						height={50}
					/>
					{route.name.replaceAll("-", " ")}
				</Link>
			))}
		</nav>
	);
};

export default NavBar;
