import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListPagination } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/ListPagination',
  component: ListPagination,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ListPagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ListPagination> = (args) => <ListPagination {...args} />;

export const Default = Template.bind({});

Default.args = {
  prevPage: '/1',
  nextPage: '/2',
};

export const SetTitle = Template.bind({});

SetTitle.args = {
  prevPage: '/上一篇文章',
  prevPageTitle: '上一篇文章的标题',
  nextPage: '/下一篇文章',
  nextPageTitle: '下一篇文章的标题',
};
