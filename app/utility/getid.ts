// retrieve the id from a link
import pokemons from "../data/pokemons.json";

export const getId = (link: string): string | undefined => {
	const match = link?.match(/\/(\d+)\//);

	if (match) {
		const id = match[1]; // Use match[1] to get the actual id part
		return id;
	}
};

// retrieve a pokemon from pokemons array
export const getPokemon = (url: string) => {
	const id = getId(url);

	if (id) {
		// Use .find to search for the Pokémon by id
		const pokemon = pokemons.find((pokemon) => pokemon.id === parseInt(id));
		return pokemon;
	}

	return undefined; // Explicitly return undefined if no match found
};
