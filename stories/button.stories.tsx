// Button.stories.tsx

import React from 'react';
import Button from '../src/button';
import { Story, Meta } from '@storybook/react/types-6-0';

type ButtonProps = React.ComponentProps<typeof Button>
const Template: Story<ButtonProps> = (args) => <Button {...args} />;


export default {
    title: 'Button',
    component: Button,
} as Meta;


export const Primary = Template.bind({});
Primary.args = {
    color: 'primary',
    text: "Save",
    onClick: () => { },
} as ButtonProps;


export const Secondary = Template.bind({});
Secondary.args = {
    ...Primary.args,
    color: 'secondary',    
} as ButtonProps;