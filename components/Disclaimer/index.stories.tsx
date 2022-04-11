import Disclaimer from '.';

export default {
  title: 'Disclaimer',
  component: Disclaimer,
};

const Template = (args: any) => <Disclaimer {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
