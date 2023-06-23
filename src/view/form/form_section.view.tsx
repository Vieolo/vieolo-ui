// React
import React, { useState } from 'react';

// Component
import FormSection from '../../FormSection';
import InputSet from '../../InputSet';

// Types
import { ViewData } from '../main/main';
import IconButton from '../../IconButton';

type FormSectionPropsType = React.ComponentProps<typeof FormSection>;

export function formSectionOptions(): ViewData {
    return {
        constants: {
            title: "Contact Details",
            secondaryValue: "",
        } as Partial<FormSectionPropsType>,
        variables: {
            disabled: 'boolean',
            secondaryValue: {
                default: "None",
                options: ["None", "String", "Component"]
            }
        }

    }
}

export function FormSectionCreator(props: { p: FormSectionPropsType }) {
    let [email, setEmail] = useState<string>('')
    let [mobile, setMobile] = useState<string>('');
    
    let sv: string | React.ReactNode | undefined = undefined;

    if ((props.p as any).secondaryValue === "String") {
        sv = "Secondary Value";
    } else if ((props.p as any).secondaryValue === "Component") {
        sv = <IconButton 
            icon={"+"}
            onClick={() => {}}
            size='extra-small'
        />
    }

    return <div className='padding--one' style={{ backgroundColor: "#ddd" }}>
        <FormSection 
            title={props.p.title} 
            disabled={props.p.disabled}
            secondaryValue={sv}
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