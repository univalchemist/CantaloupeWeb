import CustomerSupport from '.';

export default {
  title: 'CustomerSupport',
  component: CustomerSupport,
};

const Template = (args: any) => <CustomerSupport {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
