import CardListView from '.';

export default {
  title: 'CardListView',
  component: CardListView,
};

const Template = (args: any) => <CardListView {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
