import Transactions from '.';

export default {
  title: 'Transactions',
  component: Transactions,
};

const Template = (args: any) => <Transactions {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
