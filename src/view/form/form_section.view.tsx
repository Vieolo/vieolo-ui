// React
import React, { useState } from 'react';

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
            showSecondaryValue: 'boolean'
        }

    }
}

export function FormSectionCreator(props: { p: FormSectionPropsType }) {
    let [email, setEmail] = useState<string>('')
    let [mobile, setMobile] = useState<string>('');

    return <div className='padding--one' style={{ backgroundColor: "#ddd" }}>
        <FormSection 
            title={props.p.title} 
            disabled={props.p.disabled}
            secondaryValue={(props.p as any).showSecondaryValue ? "Secondary Value" : undefined}
        >
            <InputSet
                label='Email'
                error={false}
                value={email}
                onChange={v => setEmail(v)}
            />

            <InputSet
                label='Number'
                error={false}
                value={mobile}
                onChange={v => setMobile(v)}
            />
        </FormSection>
    </div>
}