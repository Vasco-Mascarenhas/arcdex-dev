export interface Moves {
	accuracy: number;
	contest_combos: {
		normal: {
			use_after: unknown;
			use_before: [
				{
					name: string;
					url: string;
				}
			];
		};
		super: {
			use_after: [
				{
					name: string;
					url: string;
				}
			];
			use_before: [
				{
					name: string;
					url: string;
				}
			];
		};
	};
	contest_effect: {
		url: string;
	};
	contest_type: {
		name: string;
		url: string;
	};
	damage_class: {
		name: string;
		url: string;
	};
	effect_chance: unknown;
	effect_changes: [
		{
			effect_entries: [
				{
					effect: string;
					language: {
						name: string;
						url: string;
					};
				}
			];
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
	learned_by_pokemon: [
		{
			name: string;
			url: string;
		}
	];
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
	meta: {
		ailment: {
			name: string;
			url: string;
		};
		ailment_chance: number;
		category: {
			name: string;
			url: string;
		};
		crit_chance: number;
		drain: number;
		flinch_chance: number;
		healing: number;
		max_hits: number;
		max_turns: number;
		min_hits: number;
		min_turns: number;
		stat_chance: number;
	};
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
	past_values: [
		{
			accuracy: number;
			effect_chance: number;
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
			power: number;
			pp: number;
			type: string;
			version_group: {
				name: string;
				url: string;
			};
		}
	];
	power: number;
	pp: number;
	priority: number;
	stat_changes: [];
	super_contest_effect: {
		url: string;
	};
	target: {
		name: string;
		url: string;
	};
	type: {
		name: string;
		url: string;
	};
}
