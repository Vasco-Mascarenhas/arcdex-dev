import { Move } from "@/app/interfaces/move/move";
import { PokemonType } from "./pokemonType";
import { HeldItem } from "../heldItem/heldItem";
import { PokemonSpecies } from "./pokemonSpecies";
export interface PokemonResponse {
	abilities: [
		{
			is_hidden: boolean;
			slot: number;
			ability: {
				name: string;
				url: string;
			};
		}
	];
	base_experience: number;
	cries: {
		latest: string;
		legacy: string;
	};
	forms: [
		{
			name: string;
			url: string;
		}
	];
	game_indices: [
		{
			game_index: number;
			version: {
				name: string;
				url: string;
			};
		}
	];
	height: number;
	held_items: HeldItem[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Move[];
	name: string;
	order: number;
	past_abilities: [];
	past_types: [];
	species: PokemonSpecies;
	sprites: {
		back_default: string;
	};
	stat: [];
	types: PokemonType[];
	weight: number;
}
