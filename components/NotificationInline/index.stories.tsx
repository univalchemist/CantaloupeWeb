import NotificationInline from '.';

export default {
  title: 'NotificationInline',
  component: NotificationInline,
};

const Template = (args: any) => <NotificationInline {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
