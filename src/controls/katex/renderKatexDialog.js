import * as React from 'react';
import KaTex from 'katex';
// import { insertEntity } from 'roosterjs-editor-plugins';
// import { Editor } from 'roosterjs-editor-core';


class InsertFormula extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td >Formula:</td>
                        <td>
                            <input type='text' ref={ref => (this.formula = ref)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Display block:</td>
                        <td><input type='checkbox' ref={ref=> (this.isBlock = ref)} /></td>
                    </tr>
                    <tr>
                        <td colSpan={2} >
                            <button onClick={this.onOk}>
                                OK
                            </button>
                            <button onClick={this.props.onDismiss}>
                                Cancel
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        this.formula.value = '';
        this.isBlock.checked = false;
    }


     onOk = () => {
        const { editor} = this.props;
        const { value } = this.formula;
        const { checked } = this.isBlock;
        this.props.onDismiss();
        editor.addUndoSnapshot(function () {
            const html = KaTex.renderToString(value, {output: 'html', displayMode: checked});
            const formulaNode = editor.getDocument().createElement('span');
            formulaNode.classList.add('katex-wrapper');
            if (checked) {
                formulaNode.classList.add('block');
            }
            formulaNode.innerHTML = '<span class="placeholder">&nbsp;</span>' + html + '<span class="placeholder-right">&nbsp;</span>';
            // formulaNode.innerHTML = '<span class="katex" contenteditable="false"><span class="katex-html" aria-hidden="true"  contenteditable="false"><span class="base">'+value+'</span></span><span>';
            // formulaNode.firstChild.setAttribute('contenteditable', 'false');
            // const katexHtml = formulaNode.getElementsByClassName('katex')[0];
            // katexHtml.setAttribute('contenteditable', 'false');
            // katexHtml.setAttribute('aria-hidden', 'false');
            formulaNode.setAttribute('contenteditable', 'false');
            editor.insertNode(formulaNode);
            // const hasFocus = editor.hasFocus();
            // if (!hasFocus) {
            //     editor.focus();
            // }
            // insertEntity(editor, 'katex', formulaNode.firstChild, false, true);
            // editor.insertContent(' ');
        }, "Format" /* Format */);
    };
}

export default function renderInsertFormulaDialog(editor, onDismiss) {
    // let a = editor.getElementAtCursor('a[href]');
    // let spanFormula = editor.getElementAtCursor('span[class="katex"]');
    // let formula = ''
    // if (spanFormula) {
    //     const annotation = spanFormula.getElementsByTagName('annotation')[0];
    //     // console.log(annotation, annotation.innerText, annotation.textContent);
    //     formula = annotation.innerText || annotation.textContent;
    // }
    return (
        <InsertFormula
            editor={editor}
            // formula={formula}
            onDismiss={onDismiss}
            // displayText={a ? a.innerText : ''}
        />
    );
}
