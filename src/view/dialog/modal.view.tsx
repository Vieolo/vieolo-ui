// React
import React, { useState } from 'react';

// Vieolo UI
import Modal from '../../Modal';

// Types
import { ViewData } from '../main/main';
import Button from '../../Button';
import Card from '../../Card';
import IconButton from '../../IconButton';

type ModalPropsType = React.ComponentProps<typeof Modal>;

export function modalOptions(): ViewData {

    return {
        constants: {

        } as Partial<ModalPropsType>,
        variables: {

        }
    }
}


export function ModalCreator(props: {p: ModalPropsType}) {

    let [open, setOpen] = useState<boolean>(false);

    let [count, setCount] = useState<number>(0)

    return <div>

        <Button 
            text='Show Modal'
            color='primary'
            onClick={() => setOpen(true)}
        />

        {
            open &&
            <Modal onClose={() => setOpen(false)}>
                <IconButton icon={"X"} onClick={() => setOpen(false)} />
                <Card onClick={() => setCount(count + 1)}>
                    <p>{count}</p>
                </Card>
            </Modal>
        }
    </div>
}