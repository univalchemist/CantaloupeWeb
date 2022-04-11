import NavListItem from '.';

export default {
  title: 'NavListItem',
  component: NavListItem,
};

const Template = (args: any) => <NavListItem {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
