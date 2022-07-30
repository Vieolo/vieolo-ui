// Vieolo UI
import Typography, { TypographyColorType } from "../Typography";
import Card from "../Card";
import Flex from "../Flex";
import Spacer from "../Spacer";

// Types
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType, TypographyOptionTypes } from "../types/types";

export default function ClickableCard(props: {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    emphasis?: EmphasisType,
    elevation?: ElevationType,
    borderRadius?: BorderRadiusType,
    color?: ColorOptionType,
    height?: string,
    width?: string,
    padding?: 'none' | 'half' | 'one',
    ariaLabel?: string,
    style?: React.CSSProperties,
    className?: string,
    icon?: React.ReactNode,
    /**
     * Since the whole card is clickable, avoid placing a button in the right items
     */
    rightItems?: React.ReactNode[],
    title: string,
    description?: string | { text: string, typographyType?: TypographyOptionTypes, textAlign?: 'left' | 'right' | 'center' | 'justify' },
    keepEmphasisTextColorClasses?: boolean
}) {

    let textColor: ColorOptionType | undefined = undefined
    let textColorType: TypographyColorType | undefined = undefined

    if (props.keepEmphasisTextColorClasses) {
        textColor = props.emphasis === 'high' ? props.color || 'primary' : props.color
        textColorType = props.emphasis === 'high' 
            ? 'text' 
            : props.emphasis === 'medium'
                ? 'text-light'
                : 'normal'
    }

    return <Card
        ariaLabel={props.ariaLabel}
        borderRadius={props.borderRadius}
        className={`vieolo-clickable-card ${props.className || ''}`}
        color={props.color}
        elevation={props.elevation}
        emphasis={props.emphasis}
        height={props.height}
        onClick={props.onClick}
        padding={props.padding}
        style={props.style}
        width={props.width}
        keepEmphasisTextColorClasses={props.keepEmphasisTextColorClasses}
    >

        <Flex justifyContent="space-between" alignItems="center">
            <Flex columnGap="one" alignItems="center">
                {
                    props.icon &&
                    props.icon
                }

                <Typography
                    type="paragraph-medium"
                    text={props.title}
                    fontWeight='bold'
                    fontFamily="secondary"
                    color={textColor}
                    colorType={textColorType}
                />
            </Flex>

            <Flex direction="row-reverse" alignItems="center" columnGap="half">
                {
                    props.rightItems &&
                    props.rightItems
                }
            </Flex>
        </Flex>

        {
            props.description &&
            <>
                <Spacer height="one" />
                {
                    typeof props.description === 'string'
                        ? <Typography
                            type="paragraph-small"
                            text={props.description}
                            color={textColor}
                            colorType={textColorType}
                        />
                        : <Typography
                            type={props.description.typographyType || 'paragraph-small'}
                            text={props.description.text}
                            textAlign={props.description.textAlign}
                            color={textColor}
                            colorType={textColorType}
                        />
                }
            </>
        }

    </Card>

}