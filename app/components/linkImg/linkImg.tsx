"use client";
import React from "react";
import { useTheme } from "../themeContext/themeProvider";
import Image from "next/image";
import linkDark from "../../../public/linkIcon/dark.png";
import linkLight from "../../../public/linkIcon/light.png";
const LinkImg = () => {
	const { theme } = useTheme();
	return theme === "light" ? (
		<Image src={linkDark} width={15} height={15} alt="link dark" />
	) : (
		<Image src={linkLight} width={15} height={15} alt="link light" />
	);
};

export default LinkImg;
