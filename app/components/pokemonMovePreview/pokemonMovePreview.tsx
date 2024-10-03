import React from "react";

const PokemonMovePreview = async ({ url }: { url: string | undefined }) => {
	const res = await fetch(`https://pokeapi.co/api/v2/move/${url}/`);
	const data = await res.json();
	return (
		<div className="move">
			<div>{data.name}</div>
			<div>{data.id}</div>
			<div>{data.power}</div>
			<div>{data.pp}</div>
			<div>{data.type.name}</div>
			<div>{data.accuracy}</div>
		</div>
	);
};

export default PokemonMovePreview;
