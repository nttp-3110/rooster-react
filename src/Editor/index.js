import React from 'react';
// import BuildInPluginState, { UrlPlaceholder } from '../BuildInPluginState';
// import SampleColorPickerPluginDataProvider from '../samplepicker/SampleColorPickerPluginDataProvider';
// import { EditorInstanceToggleablePlugins } from './EditorInstanceToggleablePlugins';
import { withStyles } from '@material-ui/core/styles';
import {
    Editor as RoosterJsEditor,
    // EditorOptions,
    // EditorPlugin,
    // UndoService,
} from 'roosterjs-editor-core';

import {
    HyperLink,
    Paste,
    ContentEdit,
    Watermark,
    TableResize,
    // ContentEditFeatures,
    getDefaultContentEditFeatures,
    CustomReplace as CustomReplacePlugin,
    EntityPlugin,
    ImageResize,
    // PickerPlugin,
} from 'roosterjs-editor-plugins';
import styles from './styles';
const assign = require('object-assign');
export const UrlPlaceholder = '$url$';

let editorInstance = null;
let editorInstanceToggleablePlugins = null;

class Editor extends React.Component {
    // private contentDiv: HTMLDivElement;
    // private editor: RoosterJsEditor;

    constructor(props) {
        super(props);
        this.state = props.initState;
    }


    getSnapshotBeforeUpdate() {
        this.disposeEditor();
    }

    componentDidUpdate() {
        this.initEditor();
    }

    componentDidMount() {
        this.initEditor();
        if (editorInstance === null) {
            editorInstance = this.editor;
        }
    }

    componentWillUnmount() {
        if (editorInstance === this.editor) {
            editorInstance = null;
        }
        this.disposeEditor();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={this.props.className}>
                <div className={classes.editor} ref={ref => (this.contentDiv = ref)} />
            </div>
        );
    }

    resetEditorPlugin(pluginState) {
        this.setState(pluginState);
    }

    getContent() {
        return this.editor.getContent();
    }

    initEditor() {
        let pluginList = this.state.pluginList;
        editorInstanceToggleablePlugins = {
            hyperlink: pluginList.hyperlink ? new HyperLink(this.getLinkCallback()) : null,
            paste: pluginList.paste ? new Paste() : null,
            contentEdit: pluginList.contentEdit
                ? new ContentEdit(this.getContentEditOptions())
                : null,
            watermark: pluginList.watermark ? new Watermark(this.state.watermarkText) : null,
            imageResize: pluginList.imageResize ? new ImageResize() : null,
            tableResize: pluginList.tableResize ? new TableResize() : null,
            // pickerPlugin: pluginList.pickerPlugin
            //     ? new PickerPlugin(new SampleColorPickerPluginDataProvider(), {
            //           elementIdPrefix: 'samplepicker-',
            //           changeSource: 'SAMPLE_COLOR_PICKER',
            //           triggerCharacter: ':',
            //           isHorizontal: true,
            //       })
            //     : null,
            customReplace: pluginList.customReplace ? new CustomReplacePlugin() : null,
            entityPlugin: pluginList.entityPlugin ? new EntityPlugin() : null,
        };
        let plugins = [
            ...Object.keys(editorInstanceToggleablePlugins).map(
                k => (editorInstanceToggleablePlugins)[k]
            ),
            ...this.props.plugins,
        ];
        let defaultFormat = { ...this.state.defaultFormat };
        let options = {
            plugins: plugins,
            defaultFormat: defaultFormat,
            undo: this.props.undo,
            initialContent: this.props.content,
            enableExperimentFeatures: this.state.useExperimentFeatures,
        };
        this.editor = new RoosterJsEditor(this.contentDiv, options);
    }

    disposeEditor() {
        if (this.editor) {
            this.editor.dispose();
        }
        this.editor = null;
    }

    getLinkCallback = () => (url) => {
        let linkCallback = (url) => url;
        let linkTitle = this.state.linkTitle;

        if (linkTitle) {
            let index = linkTitle.indexOf(UrlPlaceholder);
            if (index >= 0) {
                let left = linkTitle.substr(0, index);
                let right = linkTitle.substr(index + UrlPlaceholder.length);
                linkCallback = url => left + url + right;
            } else {
                linkCallback = () => linkTitle;
            }
        } else {
            linkCallback = null;
        }

        return linkCallback;
    }

    getContentEditOptions() {
        let defaultFeatures = getDefaultContentEditFeatures();
        return assign(defaultFeatures, this.state.contentEditFeatures);
    }
}
export default withStyles(styles)(Editor);
// // expose the active editor the global window for integration tests
// Object.defineProperty(window, 'globalRoosterEditor', {
//     get: () => editorInstance,
// });

// // expose to the global window for integration tests
// Object.defineProperty(window, 'globalRoosterEditorNamedPlugins', {
//     get: () => editorInstanceToggleablePlugins,
// });
