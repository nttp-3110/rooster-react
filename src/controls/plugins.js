// import ApiPlaygroundPlugin from './sidePane/apiPlayground/ApiPlaygroundPlugin';
// import EditorOptionsPlugin from './sidePane/editorOptions/EditorOptionsPlugin';
// import EventViewPlugin from './sidePane/eventViewer/EventViewPlugin';
// import FormatStatePlugin from './sidePane/formatState/FormatStatePlugin';
import RibbonPlugin from './ribbon/RibbonPlugin';
import KatexPlugin from './katex';
// import SidePanePlugin from './SidePanePlugin';
// import SnapshotPlugin from './sidePane/snapshot/SnapshotPlugin';
// import { EditorPlugin } from 'roosterjs-editor-core';

// export default interface Plugins {
//     ribbon: RibbonPlugin;
//     formatState: FormatStatePlugin;
//     snapshot: SnapshotPlugin;
//     editorOptions: EditorOptionsPlugin;
//     eventView: EventViewPlugin;
//     api: ApiPlaygroundPlugin;
// }

let plugins = null;

export function getPlugins() {
    if (!plugins) {
        plugins = {
            ribbon: new RibbonPlugin(),
            katex: new KatexPlugin(),
            // formatState: new FormatStatePlugin(),
            // snapshot: new SnapshotPlugin(),
            // editorOptions: new EditorOptionsPlugin(),
            // eventView: new EventViewPlugin(),
            // api: new ApiPlaygroundPlugin(),
        };
    }
    return plugins;
}

export function getAllPluginArray(includeSidePanePlugins) {
    let allPlugins = getPlugins();
    return [
        allPlugins.ribbon,
        allPlugins.katex,
        // includeSidePanePlugins && allPlugins.formatState,
        // includeSidePanePlugins && allPlugins.editorOptions,
        // includeSidePanePlugins && allPlugins.eventView,
        // includeSidePanePlugins && allPlugins.api,
    ];
}

export function getSidePanePluginArray() {
    let allPlugins = getPlugins();
    return [
        allPlugins.formatState,
        allPlugins.editorOptions,
        allPlugins.snapshot,
        allPlugins.eventView,
        allPlugins.api,
    ];
}
