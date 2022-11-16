import VDate from '@vieolo/date';
export default class Assertions {
    static assertInputInErrorMode(selector: string): void;
    static assertInputInNormalMode(selector: string): void;
    static assertURLPath(path: string): void;
    static assertDatePickerSelectedDate(label: string, expectedDate: VDate | string): void;
}
