import Carousel from '.';

export default {
  title: 'Carousel',
  component: Carousel,
};

const Template = (args: any) => <Carousel {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
