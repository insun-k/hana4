import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button Atomic',
  tags: ['autodocs'],
};

export const Primary: StoryObj<typeof meta> = {
  args: {
    variant: 'btn-primary',
    children: 'ButtonPrimary',
    classNames: 'p-7',
  },
};

export const Success: StoryObj<typeof meta> = {
  args: {
    variant: 'btn-success',
  },
  render: (args) => (
    <Button {...args} style={{ color: 'white' }}>
      Success
    </Button>
  ),
};
export const Others: StoryObj<typeof meta> = {
  render: () => (
    <div>
      <Button variant='btn-primary' style={{ color: 'ingerit' }}>
        OTHER
      </Button>
    </div>
  ),
};

export default meta;
