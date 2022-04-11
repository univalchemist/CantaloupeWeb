import AddToWallet from '.';

export default {
  title: 'AddToWallet',
  component: AddToWallet,
};

const Template = (args: any) => <AddToWallet {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
