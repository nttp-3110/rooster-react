import React from 'react';
import { Rooster } from './rooster';

export default {
    title: 'RoosterJS',
    component: Rooster
};
const Template = (args) => <Rooster {...args} />;
export const Default = Template.bind({});
