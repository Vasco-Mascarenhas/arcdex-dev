export interface Move {
	move: {
		name: string;
		url: string;
	};
	version_group_details: Array<{
		level_learned_at: number;
		move_learn_method: {
			name: string;
			url: string;
		};
		version_group: {
			name: string;
			url: string;
		};
	}>;

	power: number | null;
	pp: number;
	type: string;
	accuracy?: number | null;
}
