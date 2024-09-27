export interface PokemonEvol {
	baby_trigger_item: string;
	chain: {
		evolution_details: [];
		evolves_to: [
			{
				evolution_details: [
					{
						gender: string;
						held_item: string;
						item: string;
						known_move: string;
						known_move_type: string;
						location: string;
						min_affection: number;
						min_beauty: number;
						min_happiness: number;
						min_level: number;
						needs_overworld_rain: string;
						party_species: string;
						party_type: string;
						relative_physical_stats: string;
						time_of_day: string;
						trade_species: string;
						trigger: {
							name: string;
							url: string;
						};
						turn_upside_down: boolean;
					}
				];
				evolves_to: [
					{
						evolution_details: [
							{
								gender: string;
								held_item: string;
								item: string;
								known_move: string;
								known_move_type: string;
								location: string;
								min_affection: number;
								min_beauty: number;
								min_happiness: number;
								min_level: number;
								needs_overworld_rain: string;
								party_species: string;
								party_type: string;
								relative_physical_stats: string;
								time_of_day: string;
								trade_species: string;
								trigger: {
									name: string;
									url: string;
								};
								turn_upside_down: boolean;
							}
						];
						is_baby: boolean;
						species: {
							name: string;
							url: string;
						};
					}
				];
				is_baby: boolean;
				species: {
					name: string;
					url: string;
				};
			}
		];
		is_baby: boolean;
		species: {
			name: string;
			url: string;
		};
	};
	id: number;
}
