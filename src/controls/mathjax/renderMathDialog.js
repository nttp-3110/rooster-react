import * as React from 'react';
import {EVENT_TYPE} from '.';
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
        editor.triggerPluginEvent(EVENT_TYPE, {value, isBlock: checked});
    };
}

export default function renderInsertFormulaDialog(editor, onDismiss) {
    return (
        <InsertFormula
            editor={editor}
            onDismiss={onDismiss}
        />
    );
}
