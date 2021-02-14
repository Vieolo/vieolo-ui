import React from 'react';
import Textarea from '../src/textarea';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

type TextareaProps = React.ComponentProps<typeof Textarea>
const Template: Story<TextareaProps> = (args) => <Textarea {...args} />;


export default {
    title: 'Textarea',
    component: Textarea,
} as Meta;


export const Empty = Template.bind({});
Empty.args = {
    error: false,
    onChange: action("onChange"),
    value: "",
    placeholder: "Value"    
} as TextareaProps;


export const WithoutError = Template.bind({});
WithoutError.args = {
    error: false,
    onChange: action("onChange"),
    value: "Value"    
} as TextareaProps;


export const WithError = Template.bind({});
WithError.args = {
    error: true,
    onChange: action("onChange"),
    value: "Value"    
} as TextareaProps;


export const Small = Template.bind({});
Small.args = {
    error: false,
    onChange: action("onChange"),
    value: "Value",
    size: 'small'
} as TextareaProps;

export const Medium = Template.bind({});
Medium.args = {
    error: false,
    onChange: action("onChange"),
    value: "Value",
    size: 'medium'
} as TextareaProps;

export const Large = Template.bind({});
Large.args = {
    error: false,
    onChange: action("onChange"),
    value: "Value",
    size: 'large'
} as TextareaProps;

export const FullWidth = Template.bind({});
FullWidth.args = {
    error: false,
    onChange: action("onChange"),
    value: "Value",
    size: 'full'
} as TextareaProps;
