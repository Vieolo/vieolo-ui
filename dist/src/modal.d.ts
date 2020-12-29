import React from 'react';
export default class Modal extends React.Component<{
    onClose: () => void;
}, {}> {
    container: React.RefObject<unknown>;
    constructor(props: {
        onClose: () => void;
    });
    handleClickOutside: (event: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
