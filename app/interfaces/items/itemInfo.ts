export interface ItemData {
	attributes: [
		{
			name: string;
			url: string;
		}
	];
	baby_trigger_for: {
		url: string;
	};
	category: {
		name: string;
		url: string;
	};
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
	game_indices: [
		{
			game_index: number;
			generation: {
				name: string;
				url: string;
			};
		}
	];
	held_by_pokemon: [
		{
			pokemon: {
				name: string;
				url: string;
			};
			version_details: [
				{
					rarity: number;
					version: {
						name: string;
						url: string;
					};
				}
			];
		}
	];
	id: number;
	machines: [
		{
			machine: {
				url: string;
			};
			version_group: {
				name: string;
				url: string;
			};
		}
	];
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
	sprites: {
		default: string;
	};
}
