export interface Option {
	name: string,
	points: number,
	optionType: string,
	hp: number | null,
	tenacity: number | null,
	range: number[] | null,
	damage: string | null,
	reloading: number | null,
	charge: number | null,
	limited: number | null,
	unique: boolean,
	tags: string[],
	desc: string,
	options: Option[]
}