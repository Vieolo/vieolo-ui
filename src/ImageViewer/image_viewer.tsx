import Modal from "../Modal";

export default function ImageViewer(props: {
    file: string | File,
    fileName: string,
    context: 'embedded' | 'full screen',
    onClose?: () => void
}) {    

    let imgSrc = typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file)    

    let content = <div 
        className={`vieolo-image-viewer`}
        style={{backgroundImage: `url(${imgSrc})`}}
    >        
    </div>

    if (props.context === 'full screen') return <Modal onClose={() => { if (props.onClose) props.onClose() }}>
        <div className="height--vh-80 width--vw-90">
        {content}
        </div>
    </Modal>

    return content
}