import { Option } from "./option.model"

export interface OptionMount {
  idx: number,
  points: number,
  types: string[],
  option: Option | null,
  tagWhiteList: string[],
  tagBlackList: string[]
}

export { Option }
