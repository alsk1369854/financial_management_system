import { Dayjs } from "dayjs";

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DayjsOrNull<T, K extends keyof T> = Omit<T, K> &
  Record<K, Dayjs | null>;

export interface TotalArrearsInterface {
  totalArrears: number;
}
