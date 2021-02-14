import React from 'react';
import Input from '../src/input';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

type TextareaProps = React.ComponentProps<typeof Input>
const Template: Story<TextareaProps> = (args) => <Input {...args} />;


export default {
    title: 'Input',
    component: Input,
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: [
                    'text',
                    'password',
                    'number'
                ],
            },
        },
        size: {
            control: {
                type: 'select',
                options: [
                    'small',
                    'medium',
                    'large',
                    'full'
                ],
            },
        }
    },
} as Meta;


export const Empty = Template.bind({});
Empty.args = {
    error: false,
    onChange: action("onChange"),
    value: "",
    placeholder: "Value",
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


export const NumberType = Template.bind({});
NumberType.args = {
    error: false,
    onChange: action("onChange"),
    value: '12',
    type: 'number'
} as TextareaProps;


export const PasswordType = Template.bind({});
PasswordType.args = {
    error: false,
    onChange: action("onChange"),
    value: "Value",
    type: 'password'
} as TextareaProps;
