import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	const pokemons = [];

	// Load Pokémon data from the public folder
	for (let i = 1; i <= 30; i++) {
		// Construct the correct path for the JSON file
		const filePath = path.join(
			process.cwd(),
			"public",
			"pokeapi",
			"pokemon",
			`${i}`,
			"index.json"
		);

		try {
			const data = JSON.parse(fs.readFileSync(filePath, "utf-8")); // Read and parse the JSON file
			pokemons.push(data);
		} catch (error) {
			console.error(`Failed to read ${filePath}:`, error);
		}
	}

	// Return the pokemons data
	return NextResponse.json(pokemons);
}
