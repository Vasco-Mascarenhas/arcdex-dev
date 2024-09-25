import { PokemonType } from "./pokemonType";

export interface PokemonShort {
	id: number;
	name: string;
	types: PokemonType[];
}
