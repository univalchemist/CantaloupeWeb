import BodyContainer from '.';

export default {
  title: 'BodyContainer',
  component: BodyContainer,
};

const Template = (args: any) => <BodyContainer {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
