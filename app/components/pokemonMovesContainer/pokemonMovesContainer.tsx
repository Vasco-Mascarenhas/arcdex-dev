import { Move } from "@/app/interfaces/move/move";
import React from "react";
import PokemonMovePreview from "../pokemonMovePreview/pokemonMovePreview";
import { getId } from "@/app/utility/getid";

const PokemonMovesContainer = async ({ moves }: { moves: Move[] }) => {
	return (
		<div className="moves">
			{moves.map((move) => (
				<PokemonMovePreview key={move.move.name} url={getId(move.move.url)} />
			))}
		</div>
	);
};

export default PokemonMovesContainer;
