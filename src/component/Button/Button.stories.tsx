import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { control: "func" },
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Click Me</Button>
);

export const Primary = Template.bind({});

Primary.args = { variant: "primary" };

export const FullWidth = Template.bind({});
FullWidth.args = {
  variant: "primary",
  isFullWidth: true,
};
