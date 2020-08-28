import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import BuildInPluginState from './BuildInPluginState';
import Editor from './Editor';

// import PopoutMainPane from './PopoutMainPane';
import Ribbon from './controls/ribbon/Ribbon';
import { getDefaultContentEditFeatures } from 'roosterjs-editor-plugins';

import { getAllPluginArray, getPlugins } from './controls/plugins';
import styles from './styles';

// const styles = require('./styles.css');
const PopoutRoot = 'mainPane';
const POPOUT_HTML = `<!doctype html><html><head><title>RoosterJs Demo Page PopOut</title></head><body><div id=${PopoutRoot}></div></body></html>`;
const POPOUT_FEATURES = 'menubar=no,statusbar=no,width=1200,height=800';
const POPOUT_URL = 'about:blank';
const POPOUT_TARGET = '_blank';
export const UrlPlaceholder = '$url$';

const initialState = {
    pluginList: {
        hyperlink: true,
        paste: true,
        contentEdit: true,
        watermark: false,
        imageResize: true,
        tableResize: true,
        customReplace: true,
        pickerPlugin: true,
        entityPlugin: true,
    },
    contentEditFeatures: getDefaultContentEditFeatures(),
    defaultFormat: {},
    linkTitle: 'Ctrl+Click to follow the link:' + UrlPlaceholder,
    watermarkText: 'Type content here ...',
    showRibbon: true,
    useExperimentFeatures: true,
};
class RoosterReact extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showSidePane: window.location.hash !== '',
            showRibbon: true,
            isPopoutShown: false,
        };
        this.mouseX = null;
        this.editor = React.createRef();
        this.popoutMainPane = React.createRef();
    }

    render() {
        let plugins = getPlugins();
        const { classes, ribbonButtons } = this.props;
        return (
            <div className={classes.root}>
                {this.state.showRibbon && (
                    <Ribbon
                        plugin={plugins.ribbon}
                        className={classes.noGrow}
                        ribbonButtons={ribbonButtons}
                        ref={plugins.ribbon.refCallback}
                    />
                )}
                <div className={classes.body}>
                    <Editor
                        plugins={getAllPluginArray(this.state.showSidePane)}
                        className={classes.editor}
                        ref={this.editor}
                        initState={initialState}
                        undo={plugins.snapshot}
                        content={this.content}
                    />
                </div>
            </div>
        );
    }

    resetEditorPlugin(pluginState) {
        this.editor.current.resetEditorPlugin(pluginState);
    }

    updateFormatState() {
        getPlugins().formatState.updateFormatState();
    }

    setIsRibbonShown(isShown) {
        this.setState({
            showRibbon: isShown,
        });
    }

    // popout() {
    //     const win = window.open(POPOUT_URL, POPOUT_TARGET, POPOUT_FEATURES);
    //     win.document.write(POPOUT_HTML);
    //     win.addEventListener('unload', () => {
    //         this.content = this.popoutMainPane.current.getContent();
    //         if (this.popoutRoot) {
    //             ReactDom.unmountComponentAtNode(this.popoutRoot);
    //         }
    //         window.setTimeout(() => {
    //             this.setState({ isPopoutShown: false });
    //         }, 100);
    //     });

    //     let styles = document.getElementsByTagName('STYLE');
    //     for (let i = 0; i < styles.length; i++) {
    //         let newStyle = win.document.createElement('STYLE');
    //         let sheet = styles[i].sheet;
    //         let cssText = '';
    //         for (let j = 0; j < sheet.cssRules.length; j++) {
    //             cssText += sheet.cssRules[j].cssText;
    //         }
    //         newStyle.innerHTML = cssText;
    //         win.document.head.appendChild(newStyle);
    //     }

    //     this.content = this.editor.current.getContent();

    //     this.setState({
    //         isPopoutShown: true,
    //     });

    //     this.popoutRoot = win.document.getElementById(PopoutRoot);

    //     window.setTimeout(() => {
    //         ReactDom.render(
    //             <PopoutMainPane ref={this.popoutMainPane} content={this.content} />,
    //             this.popoutRoot
    //         );
    //     }, 0);
    // }

    onMouseDown = (e) => {
        document.addEventListener('mousemove', this.onMouseMove, true);
        document.addEventListener('mouseup', this.onMouseUp, true);
        document.body.style.userSelect = 'none';
        this.mouseX = e.pageX;
    };

    onMouseMove = (e) => {
        this.sidePane.changeWidth(this.mouseX - e.pageX);
        this.mouseX = e.pageX;
    };

    onMouseUp = (e) => {
        document.removeEventListener('mousemove', this.onMouseMove, true);
        document.removeEventListener('mouseup', this.onMouseUp, true);
        document.body.style.userSelect = '';
    };

    onShowSidePane = () => {
        this.setState({
            showSidePane: true,
        });
    };

    onHideSidePane = () => {
        this.setState({
            showSidePane: false,
        });
        window.location.hash = '';
    };
}

export default withStyles(styles)(RoosterReact);
