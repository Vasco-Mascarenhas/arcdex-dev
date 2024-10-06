import { ItemRes } from "./itemRes";

export interface ItemCategory {
	count: number;
	next: string;
	previous: string;
	results: ItemRes[];
}
