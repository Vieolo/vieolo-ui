// Vieolo UI
import { TypographyBase, TypographyParagraphMedium, TypographyParagraphSmall } from "../typography";
import Card from "./card";
import Flex from '../layout/flex/flex';
import Spacer from '../layout/auxiliary/spacer';

// Types
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType, TypographyOptionTypes } from "../private/types";

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

                <TypographyParagraphMedium
                    text={props.title}
                    fontWeight='bold'
                    fontFamily="secondary"
                    color={props.emphasis === 'high' ? props.color || 'primary' : undefined}
                    colorType={props.emphasis === 'high' ? 'text' : undefined} 
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
                        ? <TypographyParagraphSmall
                            text={props.description}
                            color={props.emphasis === 'high' ? props.color || 'primary' : undefined}
                            colorType={props.emphasis === 'high' ? 'text' : undefined}
                        />
                        : <TypographyBase
                            text={props.description.text}
                            className={`typography-${props.description.typographyType || 'paragraph-small'}`}
                            textAlign={props.description.textAlign}
                            color={props.emphasis === 'high' ? props.color || 'primary' : undefined}
                            colorType={props.emphasis === 'high' ? 'text' : undefined}
                        />
                }
            </>
        }

    </Card>

}