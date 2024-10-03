import { Move } from "./move";

export interface GroupedMove {
	move: Move["move"];
	version_group_details: { level_learned_at: number }[];
	power: number | null;
	pp: number;
	type: string;
	accuracy: number | null;
}
