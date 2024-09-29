export interface EncounterConditionValue {
	name: string;
	url: string;
}

export interface EncounterMethod {
	name: string;
	url: string;
}

export interface EncounterDetail {
	chance: number;
	condition_values: EncounterConditionValue[];
	max_level: number;
	method: EncounterMethod;
	min_level: number;
}

export interface Version {
	name: string;
	url: string;
}

export interface VersionDetail {
	encounter_details: EncounterDetail[];
	max_chance: number;
	version: Version;
}

export interface LocationArea {
	name: string;
	url: string;
}

export interface EncounterLocation {
	location_area: LocationArea;
	version_details: VersionDetail[];
}
