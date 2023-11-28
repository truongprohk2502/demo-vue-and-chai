import type { Meta, StoryObj } from "@storybook/vue3";
import MyButton from "../components/MyButton.vue";

const meta: Meta<typeof MyButton> = {
  title: "Components/MyButton",
  component: MyButton,
  tags: ["autodocs"],
  argTypes: {
    style: {
      control: "any",
      description: "Inline style of the button.",
      defaultValue: null,
    },
    class: {
      control: "any",
      description: "Style class of the button.",
      defaultValue: null,
    },
    label: {
      control: "text",
      description: "Text of the button.",
      defaultValue: null,
    },
    icon: {
      control: "text",
      description: "Name of the icon.",
      defaultValue: null,
    },
    iconPos: {
      control: "radio",
      options: ["left", "top", "bottom", "right"],
      description: "Position of the icon.",
      defaultValue: "left",
    },
    iconClass: {
      control: "text",
      description: "Style class of the icon.",
      defaultValue: null,
    },
    badge: {
      control: "text",
      description: "Value of the badge.",
      defaultValue: null,
    },
    badgeClass: {
      control: "text",
      description: "Style class of the badge.",
      defaultValue: null,
    },
    loading: {
      control: "boolean",
      description: "Whether the button is in loading state.",
      defaultValue: false,
    },
    loadingIcon: {
      control: "text",
      description: "Icon to display in loading state.",
      defaultValue: null,
    },
    link: {
      control: "boolean",
      description: "Add a link style to the button.",
      defaultValue: false,
    },
    severity: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "help",
        "danger",
      ],
      description: "Defines the style of the button.",
      defaultValue: null,
    },
    raised: {
      control: "boolean",
      description: "Add a shadow to indicate elevation.",
      defaultValue: false,
    },
    rounded: {
      control: "boolean",
      description: "Add a circular border radius to the button.",
      defaultValue: false,
    },
    text: {
      control: "boolean",
      description:
        "Add a textual class to the button without a background initially.",
      defaultValue: false,
    },
    outlined: {
      control: "boolean",
      description: "Add a border class without a background initially.",
      defaultValue: false,
    },
    size: {
      control: "inline-radio",
      options: ["small", "large"],
      description: "Defines the size of the button.",
      defaultValue: null,
    },
    plain: {
      control: "boolean",
      description:
        "Add a plain textual class to the button without a background initially.",
      defaultValue: false,
    },
    unstyled: {
      control: "boolean",
      description:
        "When enabled, it removes component related styles in the core.",
      defaultValue: false,
    },
  },
  args: {
    iconPos: "left",
    loading: false,
    link: false,
    raised: false,
    rounded: false,
    text: false,
    outlined: false,
    plain: false,
    unstyled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Click Me",
  },
};

export const Link: Story = {
  args: {
    ...Basic.args,
    link: true,
  },
};

export const Icon: Story = {
  args: {
    ...Basic.args,
    icon: "pi pi-check",
    iconPos: "right",
  },
};

export const Loading: Story = {
  args: {
    ...Basic.args,
    loading: true,
  },
};

export const Severity: Story = {
  args: {
    ...Basic.args,
    severity: "danger",
  },
};

export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const Raised: Story = {
  args: {
    ...Basic.args,
    raised: true,
  },
};

export const Rounded: Story = {
  args: {
    ...Basic.args,
    rounded: true,
  },
};

export const Text: Story = {
  args: {
    ...Basic.args,
    text: true,
  },
};

export const RaisedText: Story = {
  args: {
    ...Basic.args,
    raised: true,
    text: true,
  },
};

export const Outline: Story = {
  args: {
    ...Basic.args,
    outlined: true,
  },
};

export const Badge: Story = {
  args: {
    ...Basic.args,
    badge: "9",
  },
};
