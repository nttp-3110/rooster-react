import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { EVENT_TYPE } from '.';

class InsertFormula extends React.Component {
    state = {
      formula: '',
    }

    onChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
      
    }

    render() {
      const { formula } = this.state;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField placeholder="Formula" name="formula" label="Formula" type='text' value={formula} onChange={this.onChange} />
                </Grid>
                <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="center">
                    <IconButton variant="contained" onClick={this.onOk} color="primary"><DoneIcon/></IconButton>
                    <IconButton variant="contained" onClick={this.props.onDismiss}><ClearIcon /></IconButton>
                </Grid>
            </Grid>
        );
    }



     onOk = () => {
        const { editor} = this.props;
        const { formula } = this.state;
        this.props.onDismiss();
        editor.triggerPluginEvent(EVENT_TYPE, {formula});
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
