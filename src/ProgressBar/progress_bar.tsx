// Vieolo UI
import Flex from "../Flex"
import Spacer from "../Spacer"
import Typography from "../Typography"

// Types
import { ColorOptionType } from "../types"

export default function ProgressBar(props: {
    topRow?: {
        minValueTitle?: string,
        minValueText?: string,
        maxValueTitle?: string,
        maxValueText?: string,
    }
    bottomRow?: {
        currentValueTitle?: string,
        currentValueText?: string,
        currentValueColor?: ColorOptionType
    }
    max: number,
    value: number,
    color?: ColorOptionType
}) {
    return <div className="vieolo-progress-bar">

        {
            props.topRow &&
            <>
                <Flex alignItems="center" justifyContent="space-between">
                    <Flex direction="column">
                        {
                            props.topRow.minValueTitle &&
                            <Typography text={props.topRow.minValueTitle} type="caption-large" />
                        }

                        {
                            props.topRow.minValueText &&
                            <Typography text={props.topRow.minValueText} fontWeight="bold" />
                        }
                    </Flex>

                    <Flex direction="column" alignItems="end">
                        {
                            props.topRow.maxValueTitle &&
                            <Typography text={props.topRow.maxValueTitle} type="caption-large" />
                        }

                        {
                            props.topRow.maxValueText &&
                            <Typography text={props.topRow.maxValueText} fontWeight="bold" />
                        }
                    </Flex>
                </Flex>
                <Spacer height="half" />
            </>
        }
        <div className="vieolo-progress-bar__bar-container">
            <div
                className={`vieolo-progress-bar__bar-container__bar background-color--${props.color || 'primary'}-normal`}
                style={{ width: `${(props.value / props.max) * 100}%` }}
                title={`${((props.value / props.max) * 100).toFixed(2)}%`}
            ></div>
        </div>
        
        {
            props.bottomRow &&
            <>
                <Spacer height="half" />
                <Flex direction="column" alignItems="center">
                    {
                        props.bottomRow.currentValueTitle &&
                        <Typography text={props.bottomRow.currentValueTitle} type="caption-large" />
                    }
                    {
                        props.bottomRow.currentValueText &&
                        <Typography 
                            text={props.bottomRow.currentValueText} 
                            color={props.bottomRow.currentValueColor} 
                            type="paragraph-large"
                            fontWeight="bold" 
                        />
                    }
                </Flex>
            </>
        }
    </div>
}
