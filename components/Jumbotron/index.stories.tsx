import Jumbotron from '.';

export default {
  title: 'Jumbotron',
  component: Jumbotron,
};

const Template = (args: any) => <Jumbotron {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
