// import {  PluginEventType } from 'roosterjs-editor-types';
// const katexCss = require('katex/dist/katex.min.css').toString();

export default class KatexPlugin {

    getName() {
        return 'Katex';
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
        this.katex = ref;
    };

    onPluginEvent(event) {
        // console.log(event, PluginEventType.KeyUp, PluginEventType.MouseUp);
        // console.log(this.katex);
        // if (
        //     this.katex &&
        //     event.eventType === PluginEventType.KeyUp
        // ) {
        //     // this.katex.forceUpdate();
        //     console.log('Backspace');
        // }
    }
}
