import React from 'react';
declare type DropDownMenuProps = {
    buttonComponent: React.ReactNode;
    disabled?: boolean;
    items: {
        title: string;
        icon?: React.ReactNode;
    }[];
    onItemSelec: (title: string) => void;
    className?: string;
};
export default class DropDownMenu extends React.Component<DropDownMenuProps, {
    open: boolean;
}> {
    container: React.RefObject<unknown>;
    constructor(props: DropDownMenuProps);
    handleButtonClick: () => void;
    handleClickOutside: (event: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
