export const typeWeaknesses: Record<
	string,
	{ weaknesses: string[]; resistances: string[] }
> = {
	normal: {
		weaknesses: ["fighting"],
		resistances: [],
	}, // Normal has no 2x or 4x weaknesses
	fire: {
		weaknesses: ["water", "rock"], // Fire is weak to Water and Rock (4x against Fire types)
		resistances: ["bug", "steel", "fairy", "grass", "ice", "fire"],
	},
	water: {
		weaknesses: ["grass", "electric"], // Water is weak to Grass and Electric (4x against Water types)
		resistances: ["fire", "water", "steel", "ice"],
	},
	electric: {
		weaknesses: ["ground"], // Electric is weak to Ground (2x)
		resistances: ["flying", "steel", "electric"],
	},
	grass: {
		weaknesses: ["fire", "ice", "bug", "flying", "poison"], // Grass is weak to Fire, Ice, Bug, Flying, and Poison (4x against Grass types)
		resistances: ["water", "electric", "grass", "ground"],
	},
	ice: {
		weaknesses: ["fire", "fighting", "rock", "steel"], // Ice is weak to Fire, Fighting, Rock, and Steel (2x)
		resistances: ["ice"],
	},
	fighting: {
		weaknesses: ["flying", "psychic", "fairy"], // Fighting is weak to Flying, Psychic, and Fairy (2x)
		resistances: ["bug", "rock", "dark"],
	},
	poison: {
		weaknesses: ["ground", "psychic"], // Poison is weak to Ground and Psychic (2x)
		resistances: ["grass", "fairy", "fighting", "poison", "bug"],
	},
	ground: {
		weaknesses: ["water", "grass", "ice"], // Ground is weak to Water, Grass, and Ice (2x)
		resistances: ["poison", "rock"],
	},
	flying: {
		weaknesses: ["electric", "ice", "rock"], // Flying is weak to Electric, Ice, and Rock (2x)
		resistances: ["grass", "fighting", "bug"],
	},
	psychic: {
		weaknesses: ["bug", "ghost", "dark"], // Psychic is weak to Bug, Ghost, and Dark (2x)
		resistances: ["fighting", "psychic"],
	},
	bug: {
		weaknesses: ["fire", "flying", "rock"], // Bug is weak to Fire, Flying, Rock, Ice, and Fairy (2x)
		resistances: ["grass", "fighting", "ground"],
	},
	rock: {
		weaknesses: ["water", "grass", "fighting", "ground", "steel"], // Rock is weak to Water, Grass, Fighting, Ground, and Steel (2x)
		resistances: ["normal", "flying", "poison", "fire"],
	},
	ghost: {
		weaknesses: ["ghost", "dark"], // Ghost is weak to Ghost and Dark (2x)
		resistances: ["bug", "poison"],
	},
	dragon: {
		weaknesses: ["ice", "fairy", "dragon"], // Dragon is weak to Ice and Fairy (2x)
		resistances: ["fire", "water", "electric", "grass"],
	},
	dark: {
		weaknesses: ["fighting", "bug", "fairy"], // Dark is weak to Fighting, Bug, and Fairy (2x)
		resistances: ["ghost", "dark"],
	},
	steel: {
		weaknesses: ["fire", "fighting", "ground"], // Steel is weak to Fire, Fighting, and Ground (2x)
		resistances: [
			"normal",
			"grass",
			"ice",
			"flying",
			"psychic",
			"bug",
			"rock",
			"dragon",
			"fairy",
			"steel",
		],
	},
	fairy: {
		weaknesses: ["poison", "steel"], // Fairy is weak to Poison and Steel (2x)
		resistances: ["fighting", "bug", "dark"],
	},
};
