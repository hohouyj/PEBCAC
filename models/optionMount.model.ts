import { Option } from "./option.model"

export interface OptionMount {
  idx: number,
  points: number,
  types: string[],
  optionName: string,
  tagWhiteList: string[],
  tagBlackList: string[]
}

