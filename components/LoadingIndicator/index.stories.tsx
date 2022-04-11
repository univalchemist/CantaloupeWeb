import LoadingIndicator from '.';

export default {
  title: 'LoadingIndicator',
  component: LoadingIndicator,
};

const Template = (args: any) => <LoadingIndicator {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
