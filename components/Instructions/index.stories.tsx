import Instructions from '.';

export default {
  title: 'Instructions',
  component: Instructions,
};

const Template = (args: any) => <Instructions {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
