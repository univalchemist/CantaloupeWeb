import PageContainer from '.';

export default {
  title: 'PageContainer',
  component: PageContainer,
};

const Template = (args: any) => <PageContainer {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
