// React
import React, { useState } from 'react';

// Material UI
import BackIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import SkipIcon from '@mui/icons-material/SkipNext'

// Vieolo UI
import Walkthrough from './walkthrough';

// Types
import { ViewData } from '../view/main/main';

type WalkthroughPropsType = React.ComponentProps<typeof Walkthrough>;

export function walkthroughOptions(): ViewData {

    return {
        constants: {

        } as Partial<WalkthroughPropsType>,
        variables: {
            disableCancel: 'boolean'
        }
    }
}


export function WalkthroughCreator(props: { p: WalkthroughPropsType }) {

    let [currentPage, setCurrentPage] = useState<number>(0)
    let [calcelled, setCalcelled] = useState<boolean>(false)

    if (calcelled) {
        return <div>
            Calcelled
        </div>
    }

    let totalPage = 5;

    return <div className='width--vw-90 max-width--px-600'>
        <Walkthrough
            currentPage={currentPage}
            onBack={() => setCurrentPage(currentPage - 1)}
            onNext={() => setCurrentPage((currentPage + 1) === totalPage ? 0 : currentPage + 1)}
            onSkip={() => setCurrentPage(currentPage + 1)}
            totalPage={totalPage}
            backButtonConfig={{
                text: "Go Back",
                startIcon: <BackIcon />
            }}
            nextButtonConfig={{
                text: "Next Page",
            }}
            skipButtonConfig={{
                text: "Skip for now",
                startIcon: <SkipIcon />
            }}
            startButtonConfig={{
                text: "Yee haa",
                color: 'accessory-orange'
            }}
            progressBarConfig={{
                color: 'secondary',
                thickness: '1'
            }}
            onCancel={(props.p as any).disableCancel ? undefined : () => setCalcelled(true)}
            pages={[
                {
                    index: 0,
                    title: "Welcome To Our Great App",
                    preventSkip: true,
                    content: <div>
                        Welcome Page
                    </div>
                },
                {
                    index: 1,
                    title: "Verify Your email",
                    preventSkip: true,
                    content: <div>
                        Asking the user to verify it's email
                    </div>
                },
                {
                    index: 2,
                    title: "Your Details",
                    preventSkip: true,
                    content: <div>
                        Imagine asking for the name
                    </div>
                },
                {
                    index: 3,
                    title: "Your company",
                    content: <div>
                        You can skip this page
                    </div>
                },
                {
                    index: 0,
                    title: "Let's get started",
                    preventBack: true,
                    content: <div>
                        The walkthrough is over. You can move to other section of our great app
                    </div>
                },
            ]}
        />
    </div>
}
