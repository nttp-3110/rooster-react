import * as React from 'react';
import KaTex from 'katex';
// import { Editor } from 'roosterjs-editor-core';


class InsertFormula extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td >Formula:</td>
                        <td>
                            <input type={'text'} ref={ref => (this.formula = ref)} />
                        </td>
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
    }


     onOk = () => {
        const { editor} = this.props;
        const { value } = this.formula;
        this.props.onDismiss();
        editor.addUndoSnapshot(function () {
            const html = KaTex.renderToString(value);
            const formulaNode = editor.getDocument().createElement('span');
            formulaNode.setAttribute('contenteditable', 'false');
            formulaNode.innerHTML = html;
            const katexHtml = formulaNode.getElementsByClassName('katex-html')[0];
            katexHtml.setAttribute('contenteditable', 'false');
            editor.insertNode(formulaNode.firstChild);
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
