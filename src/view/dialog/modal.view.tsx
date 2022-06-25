// React
import React, { useState } from 'react';

// Vieolo UI
import Modal from '../../Modal';

// Types
import { ViewData } from '../main/main';
import Button from '../../Button';
import Card from '../../Card';
import IconButton from '../../IconButton';
import Spacer from '../../Spacer';
import Select from '../../Select';

type ModalPropsType = React.ComponentProps<typeof Modal>;

export function modalOptions(): ViewData {

    return {
        constants: {

        } as Partial<ModalPropsType>,
        variables: {

        }
    }
}


export function ModalCreator(props: { p: ModalPropsType }) {

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
                <Card className="width--vw-70 max-width--px-500">
                    <IconButton icon={"X"} onClick={() => setOpen(false)} />

                    <Spacer height='one' />

                    <Card onClick={() => setCount(count + 1)}>
                        <p>{count}</p>
                    </Card>

                    <Spacer height='one' />

                    <Select
                        error={false}
                        items={[
                            { title: "One", value: "one" },
                            { title: "Two", value: "two" },
                        ]}
                        onSelect={() => { }}
                        selectedItems={["One"]}
                        title="Select"
                    />
                </Card>
            </Modal>
        }
    </div>
}