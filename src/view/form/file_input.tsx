// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';

// Vieolo UI
import FileInput from '../../lib/form/file_input';
import Grid from '../../lib/layout/grid/grid';

// Types
import { ViewData } from '../main/main';
import List from '../../lib/list/list';
import GridContainer from '../../lib/layout/grid/grid_container';

type FileInputPropsType = React.ComponentProps<typeof FileInput>;

export function fileInputOptions(): ViewData {

    return {
        constants: {

        } as Partial<FileInputPropsType>,
        variables: {
            withIcon: 'boolean',
            withBrowseButton: 'boolean',
            multiple: 'boolean'
        }
    }
}


export function FileInputCreator(props: { p: FileInputPropsType }) {

    let [files, setFiles] = useState<File[]>([]);

    return <div className="width--pc-100 height--px-300">
        <GridContainer columnGap='one'>

            <Grid xl={6}>
                <div className='height--px-300'>
                    <FileInput
                        onChange={f => {
                            let fs = [...files];
                            for (let i = 0; i < f.length; i++) {
                                fs.push(f.item(i));
                            }
                            setFiles(fs)
                        }}
                        onError={(e) => {
                            console.error(e);
                        }}
                        accept='application/pdf'
                        icon={(props.p as any).withIcon ? <IconOne /> : undefined}
                        multiple={props.p.multiple}
                        text='Please drop your files here'
                        browseButtonConfig={(props.p as any).withBrowseButton ? {
                            color: 'primary',
                            emphasis: 'medium',
                            text: "Browse From Files"
                        } : undefined}
                    />
                </div>
            </Grid>

            <Grid xl={6}>
                <List
                    height='400px'
                    items={files.map((f, i) => {
                        return {
                            id: i.toString(),
                            selected: false,
                            title: f.name
                        }
                    })}
                    title='Files'
                />
            </Grid>

        </GridContainer>
    </div>
}