const styles = theme => ({
    ribbon: {
        height: 38,
        whiteSpace: 'nowrap',
        '.katex .katex-mathml': {
            display: 'none'
        }
    },
    button: {
        borderWidth: 0,
        borderWadius: 4,
        margin: 2,
        padding: 0,
        backgroundColor: 'white',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#aaf6ff'
        },
        '&.checked': {
            backgroundColor: '#00b0c3'
        }
    },
    textButton: {
        height: 32,
        verticalAlign: 'top',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 3,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    },
    dropDownButton: {
        position: 'relative',
        width: 32,
        height: 32,
        overflow: 'visible',
    },
    dropDown: {
        zIndex: 1,
        border: 'solid 1px #00bbcc',
        display: 'inline-block',
        backgroundColor: 'white',
        padding: 4,
        boxShadow: '2px 2px 4px gray',
        position: 'absolute',
        top: 14,
        left: 0,
    },
    dropDownItem: {
        cursor: 'pointer',
        padding: 2,
        whiteSpace: 'nowrap',
        minWidth: 60,
        '&:hover': {
            backgroundColor: '#aaf6ff',
        }
    }

})
export default styles;