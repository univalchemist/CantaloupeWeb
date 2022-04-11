import CardDetails from '.';

export default {
  title: 'CardDetails',
  component: CardDetails,
};

const Template = (args: any) => <CardDetails {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
