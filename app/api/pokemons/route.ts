// app/api/pokemons/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
	// Path to the folder containing all Pokémon files
	const pokemonFolderPath = path.join(process.cwd(), "pokeapi", "pokemon");
	const speciesFolderPath = path.join(
		process.cwd(),
		"pokeapi",
		"pokemon-species"
	); // Adjusted to match your folder structure

	try {
		// Read all the file names (IDs) in the pokemon folder
		const files = fs.readdirSync(pokemonFolderPath);

		// Limit to 20 Pokémon
		const limit = 20;
		const limitedFiles = files.slice(0, limit);

		// Collect all Pokémon data
		const pokemons = await Promise.all(
			limitedFiles.map(async (fileName) => {
				const filePath = path.join(pokemonFolderPath, fileName, "index.json");
				const fileContents = fs.readFileSync(filePath, "utf-8");
				const pokemonData = JSON.parse(fileContents);

				// Extract species ID from the URL (assuming it's in the format /api/v2/pokemon-species/<id>/)
				const speciesId = pokemonData.species.url.split("/").slice(-2, -1)[0]; // Get the ID before the trailing slash

				// Fetch species data for the current Pokémon
				const speciesFilePath = path.join(
					speciesFolderPath,
					speciesId,
					"index.json"
				); // Adjusting path for species files
				const speciesContents = fs.readFileSync(speciesFilePath, "utf-8");
				const speciesData = JSON.parse(speciesContents);

				// Append species data to the Pokémon data
				return { ...pokemonData, species: speciesData };
			})
		);

		// Return the list of Pokémon data with species
		return NextResponse.json(pokemons);
	} catch (error) {
		// Return a 500 error if something goes wrong
		console.error("Error fetching Pokémon data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch Pokémon data" },
			{ status: 500 }
		);
	}
}
