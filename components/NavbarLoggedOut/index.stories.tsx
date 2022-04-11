import NavbarLoggedOut from '.';

export default {
  title: 'NavbarLoggedOut',
  component: NavbarLoggedOut,
};

const Template = (args: any) => <NavbarLoggedOut {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
