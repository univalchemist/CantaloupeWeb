import Checkbox from '.';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template = (args: any) => <Checkbox {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
