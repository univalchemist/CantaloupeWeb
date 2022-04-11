import PasswordMatch from '.';

export default {
  title: 'PasswordMatch',
  component: PasswordMatch,
};

const Template = (args: any) => <PasswordMatch {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
