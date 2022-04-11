import AnchorLink from '.';

export default {
  title: 'AnchorLink',
  component: AnchorLink,
};

const Template = (args: any) => <AnchorLink {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
