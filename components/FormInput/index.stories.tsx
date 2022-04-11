import FormInput from '.';

export default {
  title: 'FormInput',
  component: FormInput,
};

const Template = (args: any) => <FormInput {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
