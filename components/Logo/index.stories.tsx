import Logo from '.';

export default {
  title: 'Logo',
  component: Logo,
};

const Template = (args: any) => <Logo {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
