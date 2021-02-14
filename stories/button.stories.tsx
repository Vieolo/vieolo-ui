import React from 'react';
import Button from '../src/button';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

type ButtonProps = React.ComponentProps<typeof Button>
const Template: Story<ButtonProps> = (args) => <Button {...args} />;


export default {
    title: 'Button',
    component: Button,
    parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;


export const Primary = Template.bind({});
Primary.args = {
    color: 'primary',
    text: "Save",
    onClick: action("onClick"),
} as ButtonProps;


export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    color: 'secondary',    
} as ButtonProps;