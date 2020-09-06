import React from 'react';
import RoosterReact from '../../src';
import 'katex/dist/katex.min.css';

export const Rooster = () => {
    const ref = React.useRef();
    const ref1 = React.useRef();
    const ref2 = React.useRef();
    const [content, setContent] = React.useState(null)
    return <div style={{position: 'absolute', top: 0, bottom: 0}}>
        <div style={{height: '300px'}}>
            {React.createElement(RoosterReact, {ref:ref})}
            
        </div>
        <div style={{height: '300px'}}>
            {React.createElement(RoosterReact, {ref: ref1})}
            
        </div>
        <div style={{height: '300px'}}>
            {React.createElement(RoosterReact, {ref: ref2})}
            
        </div>
        <button onClick={() => setContent(ref.current.getContent())}>Show HTML 1</button>
        <button onClick={() => setContent(ref1.current.getContent())}>Show HTML 2</button>
        <button onClick={() => setContent(ref2.current.getContent())}>Show HTML 3</button>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
}