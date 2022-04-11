import InfoWarning from '.';

export default {
  title: 'InfoWarning',
  component: InfoWarning,
};

const Template = (args: any) => <InfoWarning {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
