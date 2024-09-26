// pokemonData.tsx (Make sure it's not inside a 'use client' file)

// This is a server component
import React from "react";

type SearchParams = {
	pokemon?: number; // Optional, as it may not always be present
};

const PokemonData = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	// Fetch the data server-side
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${searchParams.pokemon}`
	);
	const data = await res.json();
	console.log(data);
	// Render server-side fetched data
	return <div>hello</div>;
};

export default PokemonData;
