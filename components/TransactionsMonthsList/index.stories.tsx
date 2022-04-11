import TransactionsMonthsList from '.';

export default {
  title: 'TransactionsMonthsList',
  component: TransactionsMonthsList,
};

const Template = (args: any) => <TransactionsMonthsList {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
