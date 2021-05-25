
import { parseInputTimeToCustomDate } from '../../src/time_picker';



describe("TimePicker", () => {


    test('parseInputTimeToCustomDate', async () => {

        // Incorrect values
        expect(parseInputTimeToCustomDate('')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('1')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('12')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('123')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('1234')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('12:345')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('11234')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('1:111')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('111:1')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('1111:')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate(':1111')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('as:as')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('25:12')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('12:66')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('-2:-6')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('12: 13')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('1d:1d')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('d1:d1')).toEqual([null, null]);
        expect(parseInputTimeToCustomDate('2d:11')).toEqual([null, null]);

        // Correct Values
        let correct = parseInputTimeToCustomDate('12:34');
        expect(correct[0]).toBe(12)
        expect(correct[1]).toBe(34)
    })
})