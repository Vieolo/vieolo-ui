// Vieolo UI
import FormDialog, { FormDialogAccessoryButton, FormDialogMainButton } from "../FormDialog"
import Divider from "../Divider";
import { ColorOptionType } from "../types";



export type WalkthroughSinglePage = {
    /** 
     * The number of the page in the walkthrough
     * The index is shown before the title of the page
     * index 0 (zero) won't be shown before the title, making it
     * suitable for introduction page of the walkthrough
     */
    index: number,
    /**
     * The title of the page of the walkthrough. Should be short
     */
    title: string,
    /**
     * For a better UX, the content of all of the pages should
     * have the same max height and width to have a consistent
     * look and feel
     */
    content: React.ReactNode,
    /**
     * Prevent the user from skipping the page
     */
    preventSkip?: boolean,
    /**
     * Prevent the user from going to the previous page
     */
    preventBack?: boolean    
}
 
export default function Walkthrough(props: {
    ariaLabel?: string,
    isLoading?: boolean,
    className?: string,
    displayType?: "modal" | "inline",
    currentPage: number,
    totalPage: number,
    backButtonConfig?: FormDialogMainButton,
    skipButtonConfig?: FormDialogMainButton,
    nextButtonConfig?: FormDialogMainButton,
    startButtonConfig?: FormDialogMainButton,
    doneButtonConfig?: FormDialogMainButton,
    disableNextButton?: boolean,
    pages: WalkthroughSinglePage[],
    progressBarConfig?: {
        color?: ColorOptionType,
        colorType?: "text" | "normal" | "light" | undefined,
        thickness?: "1" | "2"
    }
    /**
     * If this function is omited, there won't be a way for the user to cancel the walkthrough entirely
     */
    onCancel?: () => void,
    onSkip: () => void,
    onBack: () => void,
    onNext: () => void,
}) {

    let page = props.pages[props.currentPage];
    if (!page) return <div></div>


    let extraButtons: FormDialogAccessoryButton[] = []
    let extraButtonsLeft: FormDialogAccessoryButton[] = []


    if (props.currentPage !== 0 && !page.preventBack) {
        extraButtonsLeft.push({
            ...(props.backButtonConfig || {}),
            color: (props.backButtonConfig && props.backButtonConfig.color) ? props.backButtonConfig.color : 'error',
            onClick: () => props.onBack(),
            text: (props.backButtonConfig && props.backButtonConfig.text) ? props.backButtonConfig.text : "Back",
            emphasis: (props.backButtonConfig && props.backButtonConfig.emphasis) ? props.backButtonConfig.emphasis : 'none-background',
            startIcon: (props.backButtonConfig && props.backButtonConfig.startIcon) ? props.backButtonConfig.startIcon : undefined
        })
    }

    if ((props.currentPage + 1) !== props.totalPage && !page.preventSkip) {
        extraButtons.push({
            ...(props.skipButtonConfig || {}),
            color: (props.skipButtonConfig && props.skipButtonConfig.color) ? props.skipButtonConfig.color : 'primary',
            onClick: () => props.onSkip(),
            text: (props.skipButtonConfig && props.skipButtonConfig.text) ? props.skipButtonConfig.text : "Skip",
            emphasis: (props.skipButtonConfig && props.skipButtonConfig.emphasis) ? props.skipButtonConfig.emphasis : 'low',
            startIcon: (props.skipButtonConfig && props.skipButtonConfig.startIcon) ? props.skipButtonConfig.startIcon : undefined
        })
    }
    
    // Setting the text for the `Next` button
    let saveButtonConfig = props.nextButtonConfig || {};
    let saveButtonText = saveButtonConfig.text || "Next"

    if (props.currentPage === 0 && page.index === 0) {
        saveButtonConfig = props.startButtonConfig || {}
        saveButtonText = saveButtonConfig.text || "Start"
    } else if ((props.currentPage + 1) === props.totalPage) {
        saveButtonConfig = props.doneButtonConfig || {}
        saveButtonText = saveButtonConfig.text || "Done"
    }

    let saveButtonIcon = saveButtonConfig.startIcon
 
    return <FormDialog
        headerTitle={`${page.index ? page.index + ". " : ""} ${page.title}`.trim()}
        onCancel={props.onCancel || (() => {})}
        onSave={() => props.onNext()}
        ariaLabel={props.ariaLabel}
        isLoading={props.isLoading}
        inline={props.displayType !== 'modal'}        
        removeCancelButton
        headerRightComponent={props.onCancel ? 'close' : undefined}
        className={props.className}
        saveButtonDisabled={props.disableNextButton}
        extraButtons={extraButtons}
        extraButtonsLeft={extraButtonsLeft}        
        padding={0}
        saveButtonConfig={{
            ...saveButtonConfig, 
            text: saveButtonText,            
            startIcon: saveButtonIcon
        }}        
    >        
        <div style={{width: `${((props.currentPage + 1) / props.totalPage) * 100}%`}}>
            <Divider 
                direction="horizontal" 
                length="pc-100"
                color={(props.progressBarConfig && props.progressBarConfig.color) ? props.progressBarConfig.color : 'primary'}
                thickness={(props.progressBarConfig && props.progressBarConfig.thickness) ? props.progressBarConfig.thickness : '2'}
                colorType={(props.progressBarConfig && props.progressBarConfig.colorType) ? props.progressBarConfig.colorType : 'normal'}
            />
        </div>
        <div className="padding--one">
            {page.content}
        </div>
    </FormDialog>
}
