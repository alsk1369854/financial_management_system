import { Dayjs } from 'dayjs';

export const compareDate = (a: Dayjs, b: Dayjs): number => {
    if (a.isAfter(b)) {
        return 1;
    } else if (a.isSame(b)) {
        return 0;
    } else {
        return -1;
    }
}