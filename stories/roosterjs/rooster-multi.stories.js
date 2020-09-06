import React from 'react';
import { Rooster } from './rooster-multi';

export default {
    title: 'Multi RoosterJS ',
    component: Rooster
};
const Template = (args) => <Rooster {...args} />;
export const Default = Template.bind({});
