import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Browser } from 'roosterjs-editor-dom';
import styles from './RibbonStyles';


class RibbonButton extends React.Component {
    
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
        const { classes } = this.props;
        let checked = false;

        if (
            editor &&
            this.props.format &&
            button.checked &&
            button.checked(this.props.format, editor)
        ) {
            checked = true;
        }
        return (
            <span className={classes.dropDownButton}>
                <button
                    onClick={button.dropDownItems ? this.onShowDropDown : () => this.onExecute()}
                    className={clsx(classes.button, {[classes.checked]: checked})}>
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
        const { classes } = this.props;
        return (
            <div className={classes.dropDown}>
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
                            className={classes.dropDownItem}>
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
export default withStyles(styles)(RibbonButton);