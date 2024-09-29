"use client";
import React, { useState } from "react";
import styles from "./locationData.module.css";
import {
	EncounterLocation,
	EncounterDetail,
} from "@/app/interfaces/pokemons/pokemonLocation";

// Define a type for the merged encounter
interface MergedEncounter {
	min_level: number;
	max_level: number;
	min_chance: number;
	max_chance: number;
	method: { name: string };
}

// Helper function to merge encounter levels and chances
const mergeEncounters = (encounters: EncounterDetail[]): MergedEncounter[] => {
	const encounterMap: { [key: string]: MergedEncounter } = {};

	encounters.forEach((encounter) => {
		const key = encounter.method.name; // Use method name as the unique key

		if (!encounterMap[key]) {
			// First time encountering this method, set initial values
			encounterMap[key] = {
				method: encounter.method,
				min_level: encounter.min_level,
				max_level: encounter.max_level,
				min_chance: encounter.chance,
				max_chance: encounter.chance,
			};
		} else {
			// Merge level range and chance
			encounterMap[key].min_level = Math.min(
				encounterMap[key].min_level,
				encounter.min_level
			);
			encounterMap[key].max_level = Math.max(
				encounterMap[key].max_level,
				encounter.max_level
			);
			encounterMap[key].min_chance = Math.min(
				encounterMap[key].min_chance,
				encounter.chance
			);
			encounterMap[key].max_chance = Math.max(
				encounterMap[key].max_chance,
				encounter.chance
			);
		}
	});

	// Return the merged encounters as an array
	return Object.values(encounterMap);
};

const LocationData = ({ data }: { data: EncounterLocation[] }) => {
	// Group data by version, but ensure each route only shows once per version
	const versionMap: { [key: string]: EncounterLocation[] } = {};

	data?.forEach((location) => {
		location.version_details.forEach((versionDetail) => {
			const versionName = versionDetail.version.name;

			// Add the version to the map if it doesn't already exist
			if (!versionMap[versionName]) {
				versionMap[versionName] = [];
			}

			// Check if the location is already added for this version to avoid duplication
			const isLocationInVersion = versionMap[versionName].some(
				(loc) => loc.location_area.name === location.location_area.name
			);

			// Only add the location if it's not already present for the version
			if (!isLocationInVersion) {
				versionMap[versionName].push(location);
			}
		});
	});

	const versionKeys = Object.keys(versionMap);
	const [activeTab, setActiveTab] = useState(versionKeys[0]); // Set the first version as active by default

	// Early return if there's no data
	if (!data || data.length === 0) {
		return <p>No location data available.</p>;
	}

	return (
		<div className={styles.pokemonLocation}>
			{/* Tabs for each game version */}
			<div className={styles.tabContainer}>
				{versionKeys.map((version, index) => (
					<button
						key={index}
						className={activeTab === version ? styles.activeTab : styles.tab}
						onClick={() => setActiveTab(version)}
					>
						{version}
					</button>
				))}
			</div>

			{/* Tab Content for the selected version */}
			{activeTab && (
				<div className={styles.tabContent}>
					<table className={styles.locationTable}>
						<thead>
							<tr>
								<th>Location</th>
								<th>Encounter Method</th>
								<th>Level Range</th>
								<th>Chance</th>
							</tr>
						</thead>
						<tbody>
							{versionMap[activeTab]?.map((location, locationIndex) => {
								const mergedEncounters = mergeEncounters(
									location.version_details.find(
										(versionDetail) => versionDetail.version.name === activeTab
									)?.encounter_details || []
								);
								return mergedEncounters.map((encounter, encounterIndex) => (
									<tr key={`${locationIndex}-${encounterIndex}`}>
										{encounterIndex === 0 && (
											<td
												rowSpan={mergedEncounters.length}
												className={styles.locationName}
											>
												{location.location_area.name.replace(/-/g, " ")}
											</td>
										)}
										<td>{encounter.method.name}</td>
										<td>
											{encounter.min_level} - {encounter.max_level}
										</td>
										<td>
											{encounter.min_chance === encounter.max_chance
												? `${encounter.min_chance}%`
												: `${encounter.min_chance}% - ${encounter.max_chance}%`}
										</td>
									</tr>
								));
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default LocationData;
