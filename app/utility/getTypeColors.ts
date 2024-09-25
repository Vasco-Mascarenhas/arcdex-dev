import { typeColors } from "../constants/typeColors";

export const getTypeColor = (typeName: string) => {
	const typeColor = typeColors.find((type) => type.name === typeName);
	return typeColor ? typeColor.color : "none";
};
