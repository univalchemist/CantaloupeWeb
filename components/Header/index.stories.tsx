import Header from '.';

export default {
  title: 'Header',
  component: Header,
};

const Template = (args: any) => <Header {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
