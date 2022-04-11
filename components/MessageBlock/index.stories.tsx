import MessageBlock from '.';

export default {
  title: 'MessageBlock',
  component: MessageBlock,
};

const Template = (args: any) => <MessageBlock {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
