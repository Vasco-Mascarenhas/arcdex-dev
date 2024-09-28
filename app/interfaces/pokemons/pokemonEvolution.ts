export interface EvolutionDetail {
	gender?: string | null;
	held_item?: string | null;
	item?: { name: string; url: string } | null;
	known_move?: string | null;
	known_move_type?: { name: string; url: string } | null;
	location?: string | null;
	min_affection?: number | null;
	min_beauty?: number | null;
	min_happiness?: number | null;
	min_level?: number | null;
	needs_overworld_rain?: boolean | null;
	party_species?: string | null;
	party_type?: string | null;
	relative_physical_stats?: string | null;
	time_of_day?: string | null;
	trade_species?: string | null;
	trigger: {
		name: string;
		url: string;
	};
	turn_upside_down?: boolean | null;
}

export interface EvolutionChainLink {
	species: {
		name: string;
		url: string;
	};
	evolves_to: EvolutionChainLink[]; // This allows recursion for all evolutions
	is_baby: boolean;
	evolution_details: EvolutionDetail[];
}

export interface PokemonEvol {
	baby_trigger_item?: string | null;
	chain: EvolutionChainLink;
	id: number;
}