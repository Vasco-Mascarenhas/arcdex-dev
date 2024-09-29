export interface ItemData {
	attributes: [];
	baby_trigger_for: unknown;
	category: [];
	cost: number;
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
			language: {
				name: string;
				url: string;
			};
			text: string;
			version_group: {
				name: string;
				url: string;
			};
		}
	];
	fling_effect: {
		name: string;
		url: string;
	};
	fling_power: number;
	game_indices: [];
	held_by_pokemon: [];
	id: number;
	machines: [];
	name: string;
	sprites: {
		default: string;
	};
}
