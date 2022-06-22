// React
import React, { useState, useEffect } from 'react';

// Vieolo UI
import SelectSet from '../../SelectSet';

// Types
import { ViewData } from '../main/main';

type SelectSetPropsType = React.ComponentProps<typeof SelectSet>;

export function selectSetOptions(): ViewData {
  return {
    constants: {
      title: "Item",
      selectedItems: [],
      items: [
          {title: "One", value: "1"}, 
          {title: "Two", value: "2"}, 
          {title: "Three", value: "3", category: "Third"},
          {title: "One Two Three Four Five", value: "4", category: "Third"},
          {title: "Six", value: "6", category: "Third"},
          {title: "Seven", value: "7", category: "Third"} ,
          {title: "Eight", value: "8", category: "Third"},
          {title: "Nine", value: "9", category: "Third"} ,
          {title: "Ten", value: "10", category: "Third"},
          {title: "Eleven", value: "11", category: "Third"} ,
          {title: "Twelve", value: "12", category: "Third", subTitle: "The Substitle"},
          {title: "Thirteen", value: "13", category: "Third"} 
      ]
  } as Partial<SelectSetPropsType>,
    variables: {
      height: {
        options: ["small", "medium"],
        default: "medium"
    },
    error: {
        options: [false, true],
        default: false
    },
    clearable: {
        options: [false, true],
        default: false
    },
    searchable: {
        options: [false, true],
        default: false
    },
    multipleChoice: {
        options: [false, true],
        default: false
    },
    disabled: {
        options: [false, true],
        default: false,
    },
      withSubtitle: {
        options: [true, false],
        default: false
      },
      titleType: {
          options: ['string', 'component'],
          default: 'string'
      },
      subtitleType: {
          options: ['string', 'component'],
          default: 'string'
      },
    }
  }
}

export function SelectSetCreator(props: {p: SelectSetPropsType}) {
  const [selected, setSelected] = useState<string[]>(props.p.selectedItems || []);

  useEffect(() => {
    setSelected(props.p.selectedItems);
  }, [props.p.selectedItems])

  return <SelectSet 
    error={props.p.error}
    items={props.p.items}
    onSelect={o => setSelected(o)}
    selectedItems={selected}
    title={props.p.title}
    clearable={props.p.clearable}
    searchable={props.p.searchable}
    multipleChoice={props.p.multipleChoice}
    height={props.p.height}
    disabled={props.p.disabled}
    />
}