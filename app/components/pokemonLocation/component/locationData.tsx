"use client";
import React, { useEffect, useState, useMemo } from "react";
import styles from "./locationData.module.css";
import {
	EncounterLocation,
	EncounterDetail,
	EncounterConditionValue,
} from "@/app/interfaces/pokemons/pokemonLocation";
import { versionOrder } from "@/app/constants/pokemonOrder";

interface MergedEncounter {
	min_level: number;
	max_level: number;
	min_chance: number;
	max_chance: number;
	method: { name: string };
	conditions: EncounterConditionValue[];
}

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
				conditions: encounter.condition_values, // Store the conditions
			};
		} else {
			// Merge level range, chance, and conditions
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
			encounterMap[key].conditions = Array.from(
				new Set([
					...encounterMap[key].conditions.map((cond) => cond.name),
					...encounter.condition_values.map((cond) => cond.name),
				])
			).map((name) => ({ name } as EncounterConditionValue));
		}
	});

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

	const versionKeys = useMemo(
		() =>
			Object.keys(versionMap).sort(
				(a, b) =>
					versionOrder.findIndex((order) => order.name === a) -
					versionOrder.findIndex((order) => order.name === b)
			),
		[versionMap]
	);

	const [activeTab, setActiveTab] = useState(versionKeys[0]);

	useEffect(() => {
		if (!versionKeys.includes(activeTab)) {
			setActiveTab(versionKeys[0]);
		}
	}, [data, versionKeys, activeTab]);

	if (!data || data.length === 0) {
		return (
			<p>
				Is an evolution, mega-evolution, obtainable from trading or is a pokemon
				from sword&shield/legends Arceus (which pokeApi does not have much data)
			</p>
		);
	}

	return (
		<div className={styles.pokemonLocation}>
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

			{activeTab && (
				<div className={styles.tabContent}>
					<table className={styles.locationTable}>
						<thead>
							<tr>
								<th>Location</th>
								<th>Encounter Method</th>
								<th>Level Range</th>
								<th>Chance</th>
								<th>Conditions</th>
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
										<td className={styles.conditions}>
											{encounter.conditions.length > 0
												? encounter.conditions.map((cond, index) => (
														<span key={index}>
															{cond.name.replaceAll("-", " ")}
														</span>
												  ))
												: "None"}
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
