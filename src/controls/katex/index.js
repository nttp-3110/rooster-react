// import {  PluginEventType } from 'roosterjs-editor-types';
// const katexCss = require('katex/dist/katex.min.css').toString();
const KATEX_HTML_TAG =['MATH','SEMANTICS','MROW','ANNOTATION','MSUP','MN'];
const KATEX_ATTRIBUTES =['XMLNS', 'ENCODING', 'CONTENTEDITABLE', 'STYLE'];
export default class KatexPlugin {

    getName() {
        return 'Katex';
    }

    initialize(editor) {
        this.editor = editor;
        this.eventDisposer = editor.addDomEventHandler({
            copy: this.onExtract(false),
            cut: this.onExtract(true),
        });
    }

    onExtract(isCut) { 
        var _this = this;
        return function (event) {
            if (_this.editor) {
                // get whatever the current selection range is
                var selectionRange = _this.editor.getSelectionRange();
                if (selectionRange && !selectionRange.collapsed) {
                    var clipboardEvent = event;
                    var copyFragment = _this.editor.getSelectionRange().cloneContents();
                    var containerDiv = _this.editor.getDocument().createElement('div');
                    var haveKatex = copyFragment.querySelectorAll('span.katex');
                    if (haveKatex.length) {
                        // // Leverage script execution policy on CEDs to try and prevent XSS
                        containerDiv.contentEditable = 'true';
                        containerDiv.appendChild(copyFragment);
                        // put it on the clipboard
                        clipboardEvent.clipboardData.setData('text/html', containerDiv.innerHTML);
                        clipboardEvent.clipboardData.setData('text/plain', containerDiv.innerText);
                        // if it's cut, delete the contents
                        if (isCut) {
                            _this.editor.getSelectionRange().deleteContents();
                        }
                        event.preventDefault();
                    }
                }
            }
    }; };

    dispose() {
        this.eventDisposer();
        this.eventDisposer = null;
        this.editor = null;
    }

    getEditor() {
        return this.editor;
    }

    refCallback = (ref) => {
        this.katex = ref;
    };

    onPluginEvent(event) {
        var _this = this;
        if (event.eventType === 9 /* BeforePaste */) {
            const htmlAttributes = event.htmlAttributes;
            const fragment = event.fragment;
            const sanitizingOption_1 = event.sanitizingOption;
            const html = event.clipboardData.html;
            console.log(event);
            sanitizingOption_1.additionalAllowedTags.push(...KATEX_HTML_TAG);
            sanitizingOption_1.additionalAllowAttributes.push(...KATEX_ATTRIBUTES);
            sanitizingOption_1.additionalAllowedCssClasses.push(...['katex-wrapper', 'katex', 'katex-html', 'base', 'mord', 'strut', 'msupsub', 'vlist', 'vlist-t', 'vlist-r', 'pstrut', 'sizing', 'reset-size6', 'size3', 'mtight']);
            // if (htmlAttributes[WORD_ATTRIBUTE_NAME] == WORD_ATTRIBUTE_VALUE) {
            //     // Handle HTML copied from Word
            //     convertPastedContentFromWord_1.default(event);
            // }
            // else if (htmlAttributes[EXCEL_ATTRIBUTE_NAME] == EXCEL_ATTRIBUTE_VALUE ||
            //     htmlAttributes[EXCEL_ONLINE_ATTRIBUTE_NAME] == EXCEL_ONLINE_ATTRIBUTE_VALUE) {
            //     // Handle HTML copied from Excel
            //     convertPastedContentFromExcel_1.default(event);
            // }
            // else if ((wacListElements = fragment.querySelectorAll(constants_1.WAC_IDENTIFING_SELECTOR))[0]) {
            //     // Once it is known that the document is from WAC
            //     // We need to remove the display property and margin from all the list item
            //     wacListElements.forEach(function (el) {
            //         el.style.display = null;
            //         el.style.margin = null;
            //     });
            //     // call conversion function if the pasted content is from word online and
            //     // has list element in the pasted content.
            //     if (convertPastedContentFromWordOnline_1.isWordOnlineWithList(fragment)) {
            //         convertPastedContentFromWordOnline_1.default(fragment);
            //     }
            // }
            // else if (fragment.querySelector(GOOGLE_SHEET_NODE_NAME)) {
            //     sanitizingOption_1.additionalAllowedTags.push(GOOGLE_SHEET_NODE_NAME);
            // }
            // // TODO: Deprecate attributeCallbacks parameter
            // if (this.attributeCallbacks) {
            //     Object.keys(this.attributeCallbacks).forEach(function (name) {
            //         roosterjs_editor_dom_1.chainSanitizerCallback(sanitizingOption_1.attributeCallbacks, name, _this.attributeCallbacks[name]);
            //     });
            // }
        }
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
