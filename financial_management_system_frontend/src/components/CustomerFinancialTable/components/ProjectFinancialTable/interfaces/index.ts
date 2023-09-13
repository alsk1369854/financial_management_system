import { Dayjs } from "dayjs";
import { ProjectInterface } from "../../../../../interfaces/ProjectInterface";
import {
  DayjsOrNull,
  TotalArrearsInterface,
} from "../../../../../interfaces/Global";

// type SingleIdObj<T, K extends keyof T> =

export type ProjectTableDataType = DayjsOrNull<
  ProjectInterface,
  "startDate" | "endDate"
> &
  TotalArrearsInterface;
