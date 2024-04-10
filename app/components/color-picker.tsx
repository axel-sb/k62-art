import 'toolcool-color-picker';
import { useEffect, useRef } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'toolcool-color-picker': any;
        }
    }
}

const ColorPickerExample = () => {

    const colorPickerRef = useRef<HTMLElement>();

    useEffect(() => {

        const colorPicker = colorPickerRef.current;

        const onColorChange = (evt: Event) => {
            const customEvent = evt as CustomEvent;
            console.log(customEvent.detail.rgba);
        };

        colorPicker?.addEventListener('change', onColorChange);

        return () => {
            colorPicker?.removeEventListener('change', onColorChange);
        };
    }, []);

    return (
        <toolcool-color-picker ref={ colorPickerRef }  color="#efefef" />
    )
};

export default ColorPickerExample;
