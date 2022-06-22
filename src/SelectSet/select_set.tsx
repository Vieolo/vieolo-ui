// React
import React from 'react';

// Vieolo UI
import Select from '../Select';

// Types
import { SelectItemType } from '../Select';

// Private
import SetRowTemplate from '../private/SetRowTemplate';

export default function SelectSet(props: {
    title: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
    items: SelectItemType[],
    selectedItems: string[],
    onSelect: (values: string[]) => void,
    error: boolean,
    clearable?: boolean,
    searchable?: boolean,
    multipleChoice?: boolean,
    height?: 'medium' | 'small',
    disabled?: boolean,

}) {
    return <SetRowTemplate
        title={props.title}
        subtitle={props.subtitle}
        disabled={props.disabled}
        handleKeyboardNav={false}
        className="vieolo-select-set"
        height={props.height}
        rightSideComponent={
            <Select
            title={'Title'}
            items={props.items}
            selectedItems={props.selectedItems}
            onSelect={props.onSelect}
            error={props.error}
            clearable={props.clearable}
            searchable={props.searchable}
            multipleChoice={props.multipleChoice}
            height={props.height}
            disabled={props.disabled}
            />
        }
    />
  }
