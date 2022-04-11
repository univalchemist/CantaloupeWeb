import TransactionsList from '.';

export default {
  title: 'TransactionsList',
  component: TransactionsList,
};

const Template = (args: any) => <TransactionsList {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
