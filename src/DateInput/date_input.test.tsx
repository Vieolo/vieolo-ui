// Components
import { parseInputDateToVDate } from './date_input';

// Installed Package
import VDate from '@vieolo/vdate';


describe("DateInput", () => {

    it("Parses input date to VDate correctly", () => {
        expect((parseInputDateToVDate('22/10/2020') || new VDate()).getTime()).toBe(new VDate('2020-10-22').getTime());
        expect((parseInputDateToVDate('01/10/2020') || new VDate()).getTime()).toBe(new VDate('2020-10-01').getTime());

        expect(parseInputDateToVDate("20/1")).toBeNull();
        expect(parseInputDateToVDate("20/11/202")).toBeNull();
    })

});

