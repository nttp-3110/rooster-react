import React from 'react';
import Grid from '@material-ui/core/Grid';
import { createLink } from 'roosterjs-editor-api';


class InsertLink extends React.PureComponent {
    render() {
        return (
            <Grid>
                <tbody>
                    <tr>
                        <td >Url:</td>
                        <td>
                            <input type={'text'} ref={ref => (this.txtUrl = ref)} />
                        </td>
                    </tr>
                    <tr>
                        <td >Display text:</td>
                        <td>
                            <input type={'text'} ref={ref => (this.txtDisplayText = ref)} />
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
            </Grid>
        );
    }

    componentDidMount() {
        this.txtUrl.value = this.props.url;
        this.txtDisplayText.value = this.props.displayText;
    }

     onOk = () => {
        this.props.onDismiss();
        createLink(this.props.editor, this.txtUrl.value, null, this.txtDisplayText.value);
    };
}

export default function renderInsertLinkDialog(editor, onDismiss) {
    let a = editor.getElementAtCursor('a[href]');
    return (
        <InsertLink
            editor={editor}
            onDismiss={onDismiss}
            url={a ? a.href : ''}
            displayText={a ? a.innerText : ''}
        />
    );
}
