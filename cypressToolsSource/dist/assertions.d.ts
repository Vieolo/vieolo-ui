import VDate from '@vieolo/vdate';
export default class Assertions {
    static assertInputInErrorMode(selector: string, expectedColor?: string): void;
    static assertInputInNormalMode(selector: string, expectedColor?: string): void;
    static assertURLPath(path: string): void;
    static assertDatePickerSelectedDate(label: string, expectedDate: VDate | string): void;
    static assertSnackbar(options: {
        type: 'error' | 'success' | 'info';
        message: string;
        clickOnActionAfterAssert?: boolean;
        expectedColor?: string;
    }): void;
}
