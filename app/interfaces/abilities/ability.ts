import { PokemonShort } from "../pokemons/pokemonShort";

export interface AbilityData {
	effect_changes: [
		{
			effect_entries: [
				{
					effect: string;
					language: {
						name: string;
						url: string;
					};
				},
				{
					effect: string;
					language: {
						name: string;
						url: string;
					};
				}
			];
			version_group: {
				name: string;
				url: string;
			};
		}
	];
	effect_entries: [
		{
			effect: string;
			language: {
				name: string;
				url: string;
			};
			short_effect: string;
		}
	];
	flavor_text_entries: [
		{
			flavor_text: string;
			language: {
				name: string;
				url: string;
			};
			version_group: {
				name: string;
				url: string;
			};
		}
	];
	generation: {
		name: string;
		url: string;
	};
	id: number;
	is_main_series: boolean;
	name: string;
	names: [
		{
			language: {
				name: string;
				url: string;
			};
			name: string;
		}
	];
	pokemon: Array<{
		// Change here
		is_hidden: boolean;
		pokemon: PokemonShort;
	}>;
}
