// import {  EditorPlugin } from 'roosterjs-editor-core';
import {  PluginEventType } from 'roosterjs-editor-types';

export default class RibbonPlugin {

    getName() {
        return 'Ribbon';
    }

    initialize(editor) {
        this.editor = editor;
    }

    dispose() {
        this.editor = null;
    }

    getEditor() {
        return this.editor;
    }

    refCallback = (ref) => {
        this.ribbon = ref;
    };

    onPluginEvent(event) {
        console.log(this.ribbon);
        if (
            this.ribbon &&
            (event.eventType === PluginEventType.KeyUp ||
                event.eventType === PluginEventType.MouseUp ||
                event.eventType === PluginEventType.ContentChanged)
        ) {
            this.ribbon.forceUpdate();
        }
    }
}
