import React from 'react';
import DropDownMenu from '../src/dropdown_menu';
import Button from '../src/button';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { BsFillCaretDownFill } from 'react-icons/bs';

type DropDownMenuProps = React.ComponentProps<typeof DropDownMenu>
const Template: Story<DropDownMenuProps> = (args) => <DropDownMenu {...args} />;


export default {
    title: 'DropdownMenu',
    component: DropDownMenu,
} as Meta;


export const CustomButtonWithIcon = Template.bind({});
CustomButtonWithIcon.args = {
    buttonComponent: <Button 
        color='primary'
        text="Button"        
    />,
    items: [
        {
            title: "The First Item",
            icon: <BsFillCaretDownFill />
        },
        {
            title: 'The Second Item',
            icon: <BsFillCaretDownFill />
        }
    ]
} as DropDownMenuProps;
