import React from 'react';
import TimePicker from '../src/time_picker';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

type TimePickerProps = React.ComponentProps<typeof TimePicker>
const Template: Story<TimePickerProps> = (args) => <TimePicker {...args} />;


export default {
    title: 'TimePicker',
    component: TimePicker,
} as Meta;


export const Empty = Template.bind({});
Empty.args = {
    value: "",
    onChange: action("onChange"),
} as TimePickerProps;


export const Valid = Template.bind({});
Valid.args = {    
    ...Empty.args,
    value: "12:23",
} as TimePickerProps;


export const Invalid = Template.bind({});
Invalid.args = {    
    ...Empty.args,
    value: "24:23",
} as TimePickerProps;
