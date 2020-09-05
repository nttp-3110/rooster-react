import React from 'react';
import RoosterReact from '../../src';
import 'katex/dist/katex.min.css';

export const Rooster = () => {
    const buttons = {
        insertImage: {
            title: 'Insert inline image',
            image: require('../../src/plugins/ribbon/svg/inlineimage.svg'),
            onClick:() => alert('hello')
        }
    }
    const ref = React.useRef();
    return <div style={{position: 'absolute', top: 0, bottom: 40}}>
                <RoosterReact ribbonButtons={buttons} ref={ref} />
                <button onClick={() => console.log(ref.current.getContent())}>Get Content</button>
        </div>
}