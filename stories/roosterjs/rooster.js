import React from 'react';
import RoosterReact from '../../src';
import 'katex/dist/katex.min.css';

export const Rooster = () => {
    const ref = React.useRef();
    const [content, setContent] = React.useState(null)
    return <div style={{position: 'absolute', top: 0, bottom: 0}}>
        <RoosterReact ref={ref} />
        <button onClick={() => setContent(ref.current.getContent())}>Show Render HTML</button>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
}