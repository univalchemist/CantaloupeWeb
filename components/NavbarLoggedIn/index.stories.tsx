import NavbarLoggedIn from '.';

export default {
  title: 'NavbarLoggedIn',
  component: NavbarLoggedIn,
};

const Template = (args: any) => <NavbarLoggedIn {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
