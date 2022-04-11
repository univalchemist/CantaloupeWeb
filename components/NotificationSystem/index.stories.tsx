import NotificationSystem from '.';

export default {
  title: 'NotificationSystem',
  component: NotificationSystem,
};

const Template = (args: any) => <NotificationSystem {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
