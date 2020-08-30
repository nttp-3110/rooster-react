const styles = theme => ({
    editor: {
        border: `solid 1px ${theme.palette.primary.main}`,
        overflow: 'auto',
        padding: '10px',
        outline: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        '& .katex-wrapper': {
            position: 'relative',
            userSelect: 'all',
            '& .katex': {
                userSelect: 'all'
            },
            '& mrow': {
                display: 'inline'
            }
        }
        // '& .katex .katex-mathml': {
        //     display: 'none'
        // }
    }
});
export default styles;