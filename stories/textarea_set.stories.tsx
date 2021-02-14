import React from 'react';
import TextareaSet from '../src/textarea_set';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

type TextareaSetProps = React.ComponentProps<typeof TextareaSet>
const Template: Story<TextareaSetProps> = (args) => <TextareaSet {...args} />;


export default {
    title: 'TextareaSet',
    component: TextareaSet,
} as Meta;


export const Plain = Template.bind({});
Plain.args = {
    error: false,
    onChange: action("onChange"),
    value: "",
    placeholder: "Value",
    label: "Label"
} as TextareaSetProps;


export const WithTip = Template.bind({});
WithTip.args = {
    error: false,
    onChange: action("onChange"),
    value: "",
    placeholder: "Value",
    label: "Label",
    tip: "This is an extra information about this field!"
} as TextareaSetProps;


export const Disabled = Template.bind({});
Disabled.args = {
    error: false,
    onChange: action("onChange"),
    value: "",
    placeholder: "Value",
    label: "Label",
    tip: "This is an extra information about this field!",
    disabled: true
} as TextareaSetProps;

