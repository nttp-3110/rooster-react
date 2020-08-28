const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    noGrow: {
        flex: '0 0 auto'
    },
    body: {
        flex: '1 1 auto',
        position: 'relative',
        display: 'flex'
    },
    editor: {
        minWidth: 200,
        flexGrow: 1,
        flexShrink: 1,
        position: 'relative'
    }
});
export default styles;