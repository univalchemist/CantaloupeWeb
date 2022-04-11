import SocialButton from '.';

export default {
  title: 'SocialButton',
  component: SocialButton,
};

const Template = (args: any) => <SocialButton {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
