"use client";

import React from "react";
import pokemons from "../data/pokemons.json";
import PokemonContainer from "../components/pokemon-container/pokemonContainer";
import Input from "../components/input/input";
const Page = () => {
	return (
		<div className="pokedex">
			<aside className="pokemon-data"></aside>
			<section className="section-pokemon">
				<Input placeholder="Search for Pokemon!" />
				<PokemonContainer pokemons={pokemons} />
			</section>
		</div>
	);
};

export default Page;
