import Gutter from '.';

export default {
  title: 'Gutter',
  component: Gutter,
};

const Template = (args: any) => <Gutter {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
