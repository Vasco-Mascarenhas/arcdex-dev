import { PokemonType } from "./pokemonType";

export interface PokemonResponse {
	abilities: [
		{
			name: string;
			url: string;
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
	held_item: [];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: [
		{
			move: {
				name: string;
				url: string;
			};
		}
	];
	name: string;
	order: number;
	past_abilities: [];
	past_types: [];
	species: {
		name: string;
		url: string;
	};
	sprites: {
		back_default: string;
	};
	stat: [];
	types: PokemonType[];
	weight: number;
}
