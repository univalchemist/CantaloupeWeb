import Click2Pay from '.';

export default {
  title: 'Click2Pay',
  component: Click2Pay,
};

const Template = (args: any) => <Click2Pay {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
