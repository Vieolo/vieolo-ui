/// <reference types="react" />
export default function ItemRowSearch(props: {
    query: string;
    onChange: (v: string) => void;
    cardStyle?: 'card-light-shadow' | 'card-dark-shadow' | 'card-no-shadow';
}): JSX.Element;
