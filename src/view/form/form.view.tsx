// React
import React, { useEffect, useState } from 'react';

// Component
import Form from '../../Form';
import InputSet from '../../InputSet';

// Types
import { ViewData } from '../main/main';

type FormPropsType = React.ComponentProps<typeof Form>;

export function formOptions(): ViewData {

  return {
    constants: {
      title: "Contact Details",
      secondaryValue: "",
    } as Partial<FormPropsType>,
    variables: {
      disabled: {
          options: [false, true],
          default: false,
      },
    }

  }
}

export function FormCreator(props: { p: FormPropsType}) {
  let [value, setValue] = useState<string>('');

  useEffect(() => {
      setValue(value);
  }, [value])

  return <Form
    title={props.p.title}
    children={[[<InputSet label='Email' error={false} value={value} onChange={setValue}/>, <InputSet label='Number' error={false} value={value} onChange={setValue}/>]]}
    disabled={props.p.disabled}
  />
}