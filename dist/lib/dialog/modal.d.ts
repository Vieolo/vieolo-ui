import React from 'react';
declare type onCloseEvent = MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>;
export default function Modal({ onClose, children }: {
    onClose: (event: onCloseEvent) => void;
    children: React.ReactNode;
}): JSX.Element;
export {};
