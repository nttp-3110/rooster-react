import React from 'react';
import { Rooster } from './rooster-custom-ribbon';

export default {
    title: 'RoosterJS Custom Ribbon',
    component: Rooster
};
const Template = (args) => <Rooster {...args} />;
export const Default = Template.bind({});
