# Modal

The `Modal` component renders its children in the foreground and center, providing a backdrop, and close functionality.



```tsx
import Modal from '@vieolo/vieolo-ui/Modal';

function Example() {
    let [modalOpen, setModalOpen] = useState<boolean>(false);
    return <div>
        {
            modalOpen &&
            <Modal onClose={() => {}}>
                <Child />
            </Modal>
        }
    </div>
}
```

## Browser back button
Modal pushes a state to the browser history and closes the modal if the user clicks the back button. This behavior applies to `Modal` and all other components that rely on `Modal` such as `FormDialog`, `ConfirmationDialog`, etc.

This behavior, however, is disabled in `localhost` or `127.0.0.1` (which implies the the development mode) and enabled on other origins (which implies the production mode). The back button handling is disabled in the development mode since `react18` in the `strictmode` calls the `useEffect` twice, closing the modal immediately after opening.