
// React
import React from 'react';

// Vieolo UI
import ProgressBar from './progress_bar';

// Types
import { ViewData } from '../view/main/main';

type ProgressBarPropsType = React.ComponentProps<typeof ProgressBar>;

export function progressBarOptions(): ViewData {

    return {
        constants: {

        } as Partial<ProgressBarPropsType>,
        variables: {

        }
    }
}


export function ProgressBarCreator(props: {p: ProgressBarPropsType}) {

    return <ProgressBar
        max={30}
        value={27}
        bottomRow={{
            currentValueText: "Today",
            currentValueTitle: "3 days left",
            currentValueColor: "alert"
        }}
        topRow={{
            minValueTitle: "Date of issue",
            minValueText: "01/04/2023",
            maxValueTitle: "Due Date",
            maxValueText: "30/04/2023"
        }}
    />
}
