import React from 'react';
export default class Modal extends React.Component<{
    onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}, {}> {
    container: React.RefObject<unknown>;
    constructor(props: {
        onClose: () => void;
    });
    handleClickOutside: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
