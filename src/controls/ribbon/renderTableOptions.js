import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button'
// import { Editor } from 'roosterjs-editor-core';
import { editTable, formatTable, insertTable } from 'roosterjs-editor-api';
// import { TableOperation } from 'roosterjs-editor-types';
import Grid from '@material-ui/core/Grid';




// const TABLE_FORMAT = {
//     default: createTableFormat('#FFF', '#FFF', '#ABABAB', '#ABABAB', '#ABABAB'),
//     lightLines: createTableFormat('#FFF', '#FFF', null, '#92C0E0'),
//     towTones: createTableFormat('#C0E4FF', '#FFF'),
//     lightBands: createTableFormat('#D8D8D8', '#FFF'),
//     grid: createTableFormat('#D8D8D8', '#FFF', '#ABABAB', '#ABABAB', '#ABABAB'),
//     clear: createTableFormat('#FFF', '#FFF'),
// };


class TableOptions extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.cols = React.createRef();
        this.rows = React.createRef();
        this.evenBgColor = React.createRef();
        this.oddBgColor = React.createRef();
        this.topBorderColor = React.createRef();
        this.bottomBorderColor = React.createRef();
        this.verticalBorderColor = React.createRef();
        this.state = {
            cols: null,
            rows: null
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { cols, rows } = this.state;
        return (
            <Grid container spacing={2}>
                <Grid item><Typography variant='h6' align='center'>Insert Table</Typography></Grid>
                <Grid item>
                    <TextField value={cols} name="cols" onChange={this.onChange} label={'Columns'}/>
                </Grid>
                <Grid item>
                    <TextField value={rows} name="rows" onChange={this.onChange} label={'Rows'}/>
                </Grid>
                        {/* <tr>
                            <td colSpan={2} >
                                <button onClick={this.onInsertTable} >
                                    Insert
                                </button>
                            </td>
                        </tr> */}
                        {/* <tr>
                            <th colSpan={2}>Edit Table</th>
                        </tr>
                        <tr>
                            <td>Insert</td>
                            <td>
                                {this.renderEditTableButton('Above', TableOperation.InsertAbove)}
                                {this.renderEditTableButton('Below', TableOperation.InsertBelow)}
                                {this.renderEditTableButton('Left', TableOperation.InsertLeft)}
                                {this.renderEditTableButton('Right', TableOperation.InsertRight)}
                            </td>
                        </tr>
                        <tr>
                            <td>Delete</td>
                            <td>
                                {this.renderEditTableButton('Table', TableOperation.DeleteTable)}
                                {this.renderEditTableButton('Column', TableOperation.DeleteColumn)}
                                {this.renderEditTableButton('Row', TableOperation.DeleteRow)}
                            </td>
                        </tr>
                        <tr>
                            <td>Merge</td>
                            <td>
                                {this.renderEditTableButton('Above', TableOperation.MergeAbove)}
                                {this.renderEditTableButton('Below', TableOperation.MergeBelow)}
                                {this.renderEditTableButton('Left', TableOperation.MergeLeft)}
                                {this.renderEditTableButton('Right', TableOperation.MergeRight)}
                            </td>
                        </tr>
                        <tr>
                            <td>Split</td>
                            <td>
                                {this.renderEditTableButton(
                                    'Horizontally',
                                    TableOperation.SplitHorizontally
                                )}
                                {this.renderEditTableButton(
                                    'Vertically',
                                    TableOperation.SplitVertically
                                )}
                            </td>
                        </tr> */}
                        {/* <tr>
                            <th colSpan={2}>Format Table</th>
                        </tr>
                        <tr>
                            <td>Predefined:</td>
                            <td>
                                {this.renderFormatTableButton('Default', TABLE_FORMAT.default)}
                                {this.renderFormatTableButton('Grid', TABLE_FORMAT.grid)}
                                {this.renderFormatTableButton(
                                    'Light lines',
                                    TABLE_FORMAT.lightLines
                                )}
                                {this.renderFormatTableButton('Two tones', TABLE_FORMAT.towTones)}
                                {this.renderFormatTableButton(
                                    'Light bands',
                                    TABLE_FORMAT.lightBands
                                )}
                                {this.renderFormatTableButton('Clear', TABLE_FORMAT.clear)}
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2} >
                                Customized Colors:
                            </th>
                        </tr>
                        {this.renderCustomizeFormatRow('Even row', this.evenBgColor)}
                        {this.renderCustomizeFormatRow('Odd row', this.oddBgColor)}
                        {this.renderCustomizeFormatRow('Top border', this.topBorderColor)}
                        {this.renderCustomizeFormatRow('Bottom border', this.bottomBorderColor)}
                        {this.renderCustomizeFormatRow('Vertical border', this.verticalBorderColor)}
                        <tr>
                            <td
                                colSpan={2}
                                onClick={this.onCustomizeFormat}>
                                <button >Apply Format</button>
                            </td>
                        </tr> */}
                    <Grid container justify="space-between" alignItems="center">
                        <IconButton onClick={this.onInsertTable} color="primary"><DoneIcon /></IconButton>
                        <IconButton onClick={this.props.onDismiss}><ClearIcon /></IconButton>
                    </Grid>
            </Grid>
        );
    }

    renderEditTableButton(text, operation) {
        return (
            <button
                onClick={() => {
                    this.props.onDismiss();
                    editTable(this.props.editor, operation);
                }}>
                {text}
            </button>
        );
    }

    renderFormatTableButton(text, format) {
        return (
            <button
                onClick={() => {
                    this.props.onDismiss();
                    formatTable(this.props.editor, format);
                }}>
                {text}
            </button>
        );
    }

    renderCustomizeFormatRow(
        text,
        ref
    ) {
        return (
            <tr>
                <td >{text}</td>
                <td>
                    <input type="text" ref={ref} />
                </td>
            </tr>
        );
    }

    onInsertTable = () => {
        this.props.onDismiss();
        const { rows, cols } = this.state;
        if (cols > 0 && cols <= 10 && rows > 0 && rows <= 10) {
            insertTable(this.props.editor, cols, rows);
        }
    };

    onCustomizeFormat = () => {
        this.props.onDismiss();

        let format = createTableFormat(
            this.evenBgColor.current.value || undefined,
            this.oddBgColor.current.value || undefined,
            this.topBorderColor.current.value || undefined,
            this.bottomBorderColor.current.value || undefined,
            this.verticalBorderColor.current.value || undefined
        );

        formatTable(this.props.editor, format);
    };
}

function createTableFormat(
    bgColorEven,
    bgColorOdd,
    topBorder,
    bottomBorder,
    verticalBorder
) {
    return {
        bgColorEven: bgColorEven,
        bgColorOdd: bgColorOdd,
        topBorderColor: topBorder,
        bottomBorderColor: bottomBorder,
        verticalBorderColor: verticalBorder,
    };
}

export default function renderTableOptions(editor, onDismiss) {
    return <TableOptions editor={editor} onDismiss={onDismiss} />;
}
