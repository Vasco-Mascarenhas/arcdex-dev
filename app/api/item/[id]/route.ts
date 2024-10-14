// app/api/item/[id]/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	// Construct the path to the local item file based on the ID
	const itemPath = path.join(
		process.cwd(),
		"pokeapi",
		"item",
		params.id,
		"index.json"
	);

	try {
		// Read the file content
		const fileContents = fs.readFileSync(itemPath, "utf-8");
		const itemData = JSON.parse(fileContents);

		// Return the JSON data
		return NextResponse.json(itemData);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		// Return a 404 error if the file doesn't exist
		return NextResponse.json({ error: "Item not found" }, { status: 404 });
	}
}
