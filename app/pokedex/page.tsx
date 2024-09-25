import React from "react";
import pokemons from "../data/pokemons.json";
import PokemonContainer from "../components/pokemon-container/pokemonContainer";
const Page = () => {
	return <PokemonContainer pokemons={pokemons} />;
};

export default Page;
