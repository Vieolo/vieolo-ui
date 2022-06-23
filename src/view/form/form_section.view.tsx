// React
import React, { useEffect, useState } from 'react';

// Component
import FormSection from '../../FormSection';
import InputSet from '../../InputSet';

// Types
import { ViewData } from '../main/main';

type FormSectionPropsType = React.ComponentProps<typeof FormSection>;

export function formSectionOptions(): ViewData {
  return {
    constants: {
      title: "Contact Details",
      secondaryValue: "",
    } as Partial<FormSectionPropsType>,
    variables: {
      disabled: 'boolean',
    }

  }
}

export function FormSectionCreator(props: { p: FormSectionPropsType}) {
  let [email, setEmail] = useState<string>('')
  let [mobile, setMobile] = useState<string>('');
  
  useEffect(() => {
      setEmail(email);
      setMobile(mobile);
  }, [email, mobile])
  
  return <FormSection title={props.p.title} disabled={props.p.disabled}> 
    <InputSet label='Email' error={false} value={email} onChange={setEmail}/>
    <InputSet label='Number' error={false} value={mobile} onChange={setMobile}/>
  </FormSection>
}