import React from 'react';
type onCloseEvent = MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>;
export default function Modal({ onClose, position, children }: {
    onClose: (event: onCloseEvent) => void;
    position?: 'center' | 'top';
    children: React.ReactNode;
}): JSX.Element;
export {};
