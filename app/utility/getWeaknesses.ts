import { typeWeaknesses } from "../constants/typeWeakness";

export const getWeaknesses = (
	types: { slot: number; type: { name: string } }[]
) => {
	const weaknesses: Set<string> = new Set();

	// Check for resistances based on the second type
	const resistances: Set<string> = new Set();

	// Loop through types to gather weaknesses and resistances
	types.forEach((typeObj) => {
		const weaknessesForType =
			typeWeaknesses[typeObj.type.name]?.weaknesses || [];
		const resistancesForType =
			typeWeaknesses[typeObj.type.name]?.resistances || [];

		// Add weaknesses to the weaknesses set
		weaknessesForType.forEach((weakness) => weaknesses.add(weakness));

		// Add resistances to the resistances set
		resistancesForType.forEach((resistance) => resistances.add(resistance));
	});

	// Filter weaknesses to return only those that are not resisted by the second type
	const effectiveWeaknesses = Array.from(weaknesses).filter(
		(weakness) => !resistances.has(weakness)
	);

	return effectiveWeaknesses;
};
