import OTP from '.';

export default {
  title: 'OTP',
  component: OTP,
};

const Template = (args: any) => <OTP {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
