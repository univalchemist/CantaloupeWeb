import Image from '.';

export default {
  title: 'Image',
  component: Image,
};

const Template = (args: any) => <Image {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
