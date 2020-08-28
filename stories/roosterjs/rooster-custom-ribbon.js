import React from 'react';
import RoosterReact from '../../src';
import 'katex/dist/katex.min.css';

export const Rooster = () => {
    const buttons = {
        insertImage: {
            title: 'Insert inline image',
            image: require('../../src/controls/ribbon/svg/inlineimage.svg'),
            onClick:() => alert('hello')
        }
    }
    return <div style={{position: 'absolute', top: 0, bottom: 0}}><RoosterReact ribbonButtons={buttons} /></div>
}