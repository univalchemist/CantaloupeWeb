import Navbar from '.';

export default {
  title: 'Navbar',
  component: Navbar,
};

const Template = (args: any) => <Navbar {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
