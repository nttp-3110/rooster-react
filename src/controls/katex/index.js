// import {  PluginEventType } from 'roosterjs-editor-types';
// const katexCss = require('katex/dist/katex.min.css').toString();
const KATEX_HTML_TAG = ['MATH','SEMANTICS','MROW','ANNOTATION','MSUP','MN', 'SVG', 'G', 'PATH', 'RECT'];
const KATEX_ATTRIBUTES = ['XMLNS', 'ENCODING', 'CONTENTEDITABLE', 'STYLE', 'WIDTH', 'HEIGHT', 'D', 'viewBox', 'preserveAspectRatio'];
const KATEX_CLASSES = ['katex-wrapper', 'katex', 'katex-html', 'base', 'mord', 'strut', 'msupsub', 
                        'vlist', 'vlist-t', 'vlist-r', 'pstrut', 'sizing', 'reset-size6', 'size3', 'mtight',
                        'svg-align', 'hide-tail', 'd', 'mop', 'op-symbol',  'mtable', 'col-align', 'arraycolsep',
                        'col-align-c', 'vlist-t2', 'vlist-s', 'delimsizing', 'size4', 'mclose', 'nulldelimiter', 'minner',
                        'mopen', 'frac-line'
                    ]
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
        if (event.eventType === 9 /* BeforePaste */) {
            const sanitizingOption_1 = event.sanitizingOption;
            sanitizingOption_1.additionalAllowedTags.push(...KATEX_HTML_TAG);
            sanitizingOption_1.additionalAllowAttributes.push(...KATEX_ATTRIBUTES);
            sanitizingOption_1.additionalAllowedCssClasses.push(...KATEX_CLASSES);
        }
    }
}
