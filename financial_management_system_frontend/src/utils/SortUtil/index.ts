import { Moment } from 'moment';


export const compareDate = (a: Moment, b: Moment): number => {
    if (a.isAfter(b)) {
        return 1;
    } else if (a.isSame(b)) {
        return 0;
    } else {
        return -1;
    }
}