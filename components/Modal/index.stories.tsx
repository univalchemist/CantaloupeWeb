import Modal from '.';

export default {
  title: 'Modal',
  component: Modal,
};

const Template = (args: any) => <Modal {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
