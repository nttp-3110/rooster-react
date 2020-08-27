import * as React from 'react';
// import MainPaneBase from '../MainPaneBase';
// import RibbonButtonType, { DropDownRenderer } from './RibbonButtonType';
// import RibbonPlugin from './RibbonPlugin';
import { Browser } from 'roosterjs-editor-dom';
// import { FormatState } from 'roosterjs-editor-types';

const styles = require('./RibbonButton.css');


export default class RibbonButton extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            isDropDownShown: false,
        };
        this.range = null;
    }

    render() {
        let button = this.props.button;
        let editor = this.props.plugin.getEditor();
        let className = styles.button;

        if (
            editor &&
            this.props.format &&
            button.checked &&
            button.checked(this.props.format, editor)
        ) {
            className += ' ' + styles.checked;
        }
        return (
            <span className={styles.dropDownButton}>
                <button
                    onClick={button.dropDownItems ? this.onShowDropDown : () => this.onExecute()}
                    className={className}>
                    <img src={button.image} width={32} height={32} title={button.title} alt='' />
                </button>
                {button.dropDownItems &&
                    this.state.isDropDownShown &&
                    this.renderDropDownItems(button.dropDownItems, button.dropDownRenderer)}
            </span>
        );
    }

    onExecute = (value) => {
        const { button, plugin } = this.props;
        const editor = plugin.getEditor();
        this.onHideDropDown();
        if (button.onClick) {
            button.onClick(editor, value);
            // MainPaneBase.getInstance().updateFormatState();
        }

        this.props.onClicked();
    };

    onShowDropDown = () => {
        if (Browser.isSafari) {
            this.range = this.props.plugin.getEditor().getSelectionRange();
        }

        if (!this.props.button.preserveOnClickAway) {
            this.getDocument().addEventListener('click', this.onHideDropDown);
        }
        this.setState({
            isDropDownShown: true,
        });
    };

    onHideDropDown = () => {
        if (Browser.isSafari) {
            this.props.plugin.getEditor().select(this.range);
        }

        this.getDocument().removeEventListener('click', this.onHideDropDown);
        this.setState({
            isDropDownShown: false,
        });
    };

    renderDropDownItems(items, renderer) {
        return (
            <div className={styles.dropDown}>
                {Object.keys(items).map(key =>
                    renderer ? (
                        <div key={key}>
                            {renderer(
                                this.props.plugin.getEditor(),
                                this.onHideDropDown,
                                key,
                                items[key]
                            )}
                        </div>
                    ) : (
                        <div
                            key={key}
                            onClick={() => this.onExecute(key)}
                            className={styles.dropDownItem}>
                            {items[key]}
                        </div>
                    )
                )}
            </div>
        );
    }

    getDocument() {
        return this.props.plugin.getEditor().getDocument();
    }
}
