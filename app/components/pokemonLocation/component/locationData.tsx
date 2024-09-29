"use client";
import React, { useEffect, useState } from "react";
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

const versionReleaseDates: { [key: string]: string } = {
	// Generation 1
	red: "1996-02-27",
	blue: "1996-02-27",
	yellow: "1998-09-12",

	// Generation 2
	gold: "1999-11-21",
	silver: "1999-11-21",
	crystal: "2000-12-14",

	// Generation 3
	ruby: "2002-11-21",
	sapphire: "2002-11-21",
	emerald: "2004-09-16",
	firered: "2004-01-29",
	leafGreen: "2004-01-29",

	// Generation 4
	diamond: "2006-09-28",
	pearl: "2006-09-28",
	platinum: "2008-09-13",
	heartgold: "2009-09-12",
	soulsilver: "2009-09-12",

	// Generation 5
	black: "2010-09-18",
	white: "2010-09-18",
	black2: "2012-06-23",
	white2: "2012-06-23",

	// Generation 6
	x: "2013-10-12",
	y: "2013-10-12",
	omegaruby: "2014-11-21",
	alphasapphire: "2014-11-21",

	// Generation 7
	sun: "2016-11-18",
	moon: "2016-11-18",
	ultrasun: "2017-11-17",
	ultramoon: "2017-11-17",

	// Generation 8
	sword: "2019-11-15",
	shield: "2019-11-15",
	brilliantdiamond: "2021-11-19",
	shiningpearl: "2021-11-19",
	legendsarceus: "2022-01-28",

	// Generation 9
	scarlet: "2022-11-18",
	violet: "2022-11-18",
};

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
	const versionMap: { [key: string]: EncounterLocation[] } = {};

	data?.forEach((location) => {
		location.version_details.forEach((versionDetail) => {
			const versionName = versionDetail.version.name;

			if (!versionMap[versionName]) {
				versionMap[versionName] = [];
			}

			const isLocationInVersion = versionMap[versionName].some(
				(loc) => loc.location_area.name === location.location_area.name
			);

			if (!isLocationInVersion) {
				versionMap[versionName].push(location);
			}
		});
	});

	// Sort version keys by their release date
	const versionKeys = Object.keys(versionMap).sort((a, b) => {
		const releaseDateA = new Date(versionReleaseDates[a]).getTime();
		const releaseDateB = new Date(versionReleaseDates[b]).getTime();
		return releaseDateA - releaseDateB;
	});

	const [activeTab, setActiveTab] = useState(versionKeys[0]);
	// Monitor data changes and adjust active tab if the current active tab is not in the version list
	useEffect(() => {
		if (!versionKeys.includes(activeTab)) {
			setActiveTab(versionKeys[0]); // Fallback to the first version if the active one is not found
		}
	}, [data, versionKeys, activeTab]);

	if (!data || data.length === 0) {
		return (
			<p>
				Is an evolution, obtainable from trading or is a pokemon from
				sword&shield/legends Arceus (which pokeApi has no data)
			</p>
		);
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
						{version.replace("-", " ")}
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
										<td>{encounter.method.name.replace("-", " ")}</td>
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
