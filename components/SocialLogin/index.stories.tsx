import SocialLogin from '.';

export default {
  title: 'SocialLogin',
  component: SocialLogin,
};

const Template = (args: any) => <SocialLogin {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
