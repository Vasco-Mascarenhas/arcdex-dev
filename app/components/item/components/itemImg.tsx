"use client";

import React from "react";
import Image from "next/image";
import { getId } from "@/app/utility/getid";
import missingImg from "@/public/notfound/404.png";
interface ItemImgProps {
	url: string;
	name: string;
}

const ItemImg = ({ url, name }: ItemImgProps) => {
	const handleImgError = async (
		e: React.SyntheticEvent<HTMLImageElement>,
		id: number
	) => {
		const target = e.target as HTMLImageElement;
		const primarySrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${id}.png`;
		const fallbackSrc = "/notfound/404.png";

		try {
			const response = await fetch(primarySrc);
			if (!response.ok) {
				throw new Error("Primary image not found");
			}
			target.src = primarySrc;
		} catch {
			target.src = fallbackSrc;
		}
	};

	return (
		<Image
			src={url ? url : missingImg}
			width={30}
			height={30}
			alt={`${name} image`}
			onError={(e) => handleImgError(e, Number(getId(url)))}
		/>
	);
};

export default ItemImg;
